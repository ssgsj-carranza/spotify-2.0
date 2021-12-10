import {atom} from "recoil";

export const currentTrackIdState = atom({
    key: 'currentTrackIdState',
    default: null, //this is the default value
});

export const isPlayingState = atom({
    key: 'isPlayingState',
    default: false,
});
