import {getProviders, signIn} from 'next-auth/react';

function Login({providers}) {
    return (
        <div>
            <h1>login page</h1>        
        </div>
    );
}

export default Login

//renders it on server before login and delivers it to the client
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
