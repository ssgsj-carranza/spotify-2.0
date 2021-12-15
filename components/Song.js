import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import {PlayIcon} from '@heroicons/react/solid';
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useState } from "react";


function Song({order, track}) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        });
    };

    return (
        <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
            <div onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave} className="group flex items-center space-x-4">
                <p>
                    {!isHovered ? (`${order + 1}`) : (<PlayIcon className='h-7 w-7' />)}
                    </p>
                <img className="h-10 w-10" src={track.track.album.images[0].url} alt="" />
                <div>
                    <p className='w-36 lg:w-64 truncate text-white'>{track.track.name}</p>
                    <p className="w-40 text-sm font-semibold">{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className="hidden md:inline text-sm font-semibold w-40">{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song;


//  className="group-hover:hidden"
// <PlayIcon className='h-7 w-7' />