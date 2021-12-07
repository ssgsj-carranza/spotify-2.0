import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    //sends both access token and refresh token back to spotify and refreshes dead access token with refreshed token and returns a new access token
    const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
    console.log('refreshed token is', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // 1 hour returns from spotify api
      //incase spotify wants to refresh refreshedtoken it defaults to refresh token
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } 
  catch(error) {
    console.error(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization:LOGIN_URL,
    }),
    // ...add more providers here
  ],
  //encrypt jwt received from spotify
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  //authentication below
  callbacks: {
    async jwt({token, account, user}) {
      // initial singin
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //handles expire time in milliseconds
        };
      }
      //if access token still valid returns previous token
      if (Date.now() < token.accessTokenExpires) {
        console.log('existing token is valid');
        return token;
      }
      // if access token expired, refreshes it
      console.log('token has expired');
      return await refreshAccessToken(token);
    },
    //what user taps into as their client session, allocates what we want from the token to user
    async session({session, token}) {
      session.user.accessToken = token,accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    }
  },
});