import {atom} from "recoil";

export const currentTrackState = atom({
    key: 'currentTrackIdState',
    default: null, //this is the default value
});

export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false,
});
