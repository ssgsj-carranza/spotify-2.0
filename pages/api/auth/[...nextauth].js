import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { LOGIN_URL } from "../../../lib/spotify"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_ID,
      authorization:LOGIN_URL,
    }),
    // ...add more providers here
  ],
  //encrypt jwt received from spotify
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
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
      console.log('token has expired')
      return await returnAcessToken(token)
    },
  },
});