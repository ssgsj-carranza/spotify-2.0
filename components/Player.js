import { RewindIcon, SwitchHorizontalIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, VolumeUpIcon } from "@heroicons/react/solid";
import {HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";


function Player() {
    const spotifyApi = useSpotify();
    const {data: session, status} = useSession();
    const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();
    
    const fetchCurrentSong = () => {
        if (!songInfo) {
            //got the current playing track and set that as the id track
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log('now playing:', data.body?.item);
                setCurrentIdTrack(data.body?.item.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    console.log('now playing:', data.body);
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            //fecth song info
            fetchCurrentSong();
            setVolume(50);
        }
    },[currentTrackId, spotifyApi, session]);

    return (
        <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            {/* left section */}
            <div className='flex items-center space-x-4'>
                <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            
            {/* center section */}
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='button'/>
                <RewindIcon className='button'
                            // onClick={() => spotifyApi.skipToPrevious()} API call is not working on spotify side
                />

                {isPlaying ? (
                    <PauseIcon className='button w-10 h-10' />
                ) : (
                    <PlayIcon className='button w-10 h-10'/>
                )}        
            </div>
        </div>
    )
}

export default Player;
