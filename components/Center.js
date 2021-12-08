import { useSession } from "next-auth/react";


function Center() {
    const {data: session} = useSession();

    return (
        <div className="flex flex-grow text-white">
            <header>
                <div className="">
                    <img className="rounded-full w-10 h-10" src={session?.user?.image} alt="" />
                    <h2>{session?.user?.name}</h2>
                </div>
            </header>       
        </div>
    )
}

export default Center;
