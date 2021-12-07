import {getProviders, signIn} from 'next-auth/react';

function Login({providers}) {
    return (
        <div>
            <img className="w-52 mb-5" src='https://links.papareact.com/9xl' alt=''/>

            {Object.values(providers).map((provider) => (
                <div>
                    <button>test</button>
                </div>
            ))}        
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
