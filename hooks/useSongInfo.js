import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";


//using song id to fetch song info
function useSongInfo() {
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const spotifyApi = useSpotify();

    return (
        <div>
            
        </div>
    )
}

export

default useSongInfo
