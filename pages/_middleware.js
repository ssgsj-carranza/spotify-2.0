import {getToken} from 'next-auth/jwt';
import {NextResponse} from 'next/server';

export async function middleware(req) {
    //token will exist if user is logged in
   const token = await getToken({req, secret: process.env.JWT_SECRET});
   const {pathname} = req.nextUrl;
   
   //Allow requests if the following is true: 
   //a request for next-auth session and provider fetching
   if (pathname.includes('/api/auth')|| token) {
       //basically says continue on since they have token
       return NextResponse.next();
   }
   //redirect to login if they dont have a token and are requesting a protected route
   if (!token && pathname !== '/login') {
       return NextResponse.redirect('/login');
   }
}