import { createPlaylistSQL, getUserPlaylistsSQL } from "../utils/sql/playlistsSQL.js";

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

export {
    createPlaylist,
    getUserPlaylists
}