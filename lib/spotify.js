import SpotifyWebApi from "spotify-web-api-node";

// scopes are permissions granted by spotify api
const scopes = [
    "user-read-email",
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read',
].join(',');

const params = {
    scopes: scopes,
};