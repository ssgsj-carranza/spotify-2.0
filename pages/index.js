import { getSession } from 'next-auth/react';
import Head from 'next/head'
import Center from '../components/Center';
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex'>
        {/* sidebar */}
        <Sidebar />
        {/* center */}
        <Center />
      </main>
      
      <div>
        {/* player */}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}


// npm install @heroicons/react
// npm install next-auth@beta
// npm install spotify-web-api-node --save
// npm install tailwind-scrollbar-hide
// npm install lodash
// npm install recoil
