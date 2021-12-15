import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import spotifyApi from "../lib/spotify";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-red-500',
    'from-green-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500',
];


function Center() {
    const {data: session} = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();

    useEffect(() => {
        setColor(shuffle(colors).pop())    
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        })
        .catch((err) => console.log('error', err));
    }, [spotifyApi, playlistId]);
    console.log(playlist);

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-70 transform transition ease-in-out cursor-pointer rounded-full p-1 pr-2" onClick={signOut}>
                    <img className="rounded-full w-10 h-10" src={session?.user?.image} alt="" />
                    <h2 className='text-white'>{session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
                    <div className='flex items-center space-x-2'>
                        <img className="rounded-full w-10 h-10" src={playlist?.tracks.items[0].track.album.images[0].url} alt="" />
                        <h2 className='text-white font-bold'>{playlist?.owner.display_name}</h2>
                        <h2 className='text-sm text-gray-400 font-semibold'> · {playlist?.followers.total} followers · {playlist?.tracks.total} songs</h2>
                    </div>
                </div>
            </section>
            <div>
                <Songs />
            </div>       
        </div>
    )
}

export default Center;
