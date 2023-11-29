import { createPlaylistSQL, getUserPlaylistsSQL, addTrackPlaylistSQL, getPlaylistTrackByTitleSQL } from "../utils/sql/playlistsSQL.js";

const createPlaylist = async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    try{
        const playlist = await createPlaylistSQL(title, user)
        res.status(200).json(playlist)
    }catch(error){
        res.status(500).json({message: "An error occured"})
    }
}

const getUserPlaylists = async (req, res) => {
    const user = req.user;
    try{
        const playlists = await getUserPlaylistsSQL(user)

        res.status(200).json(playlists)
    }catch(error){
        res.status(500).json({message: "An error occured"})
    }
}

const addTrackPlaylist = async (req, res) => {

    console.log("hello?")
    
    const {track, playlist} = req.body

    console.log(track, playlist)
    

    try{
        await addTrackPlaylistSQL(track, playlist)
    }catch(error){
        res.status(500).json({error: "an error occured"})
    }


}

const getPlaylistTracks = async (req, res) => {
    const {title} = req.params;
    const user = req.user;

    // console.log(user, title)

    try{
        const tracks = await getPlaylistTrackByTitleSQL(title, user)
        return res.status(200).json(tracks)
    }catch(error){
        return res.status(500).json({error: "an error occured"})
    }
}

export {
    createPlaylist,
    getUserPlaylists,
    addTrackPlaylist,
    getPlaylistTracks
}