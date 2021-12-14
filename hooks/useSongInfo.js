import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";


//using song id to fetch song info
function useSongInfo() {
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
    const spotifyApi = useSpotify();
    const [songInfo, setSongInfo] = useState(null, songInfo);

//this is how you run an async conde inside a useEffect, by encapsulating it
//when you make a request to an api, the access token is placed on the header, pass it around as a bearer with the token, know spotify knows the user is authenticated
    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) {
                const trackInfo = await 
                fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then((res) => res.json());
                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    },[currentTrackId, spotifyApi])

    return songInfo;
}

export default useSongInfo
