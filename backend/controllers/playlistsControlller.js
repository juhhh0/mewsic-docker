import { createPlaylistSQL, getUserPlaylistsSQL, addTrackPlaylistSQL, getPlaylistTrackByTitleSQL, deleteTrackPlaylistSQL, getPlaylistTracksSQL, getPlaylistByTitleSQL, deleteAllPlaylistsTracksSQL, deletePlaylistSQL } from "../utils/sql/playlistsSQL.js";

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
    
    const {track, playlist} = req.body

    const playlistTracks = await getPlaylistTracksSQL(playlist)

    const added = playlistTracks.find(objet => objet._id === track);

    try{
        if(added != undefined){
            await deleteTrackPlaylistSQL(track, playlist)
        }else{
            await addTrackPlaylistSQL(track, playlist)
        }
        res.status(200).json({message: "track added to playlist"})
    }catch(error){
        res.status(500).json({error: "an error occured"})
    }


}

const getPlaylistTracks = async (req, res) => {
    const {title} = req.params;
    const user = req.user;

    // console.log(user, title)

    try{
        const id = await getPlaylistByTitleSQL(title)
        const tracks = await getPlaylistTrackByTitleSQL(title, user)
        return res.status(200).json({tracks: tracks, playlist: id})
    }catch(error){
        return res.status(500).json({error: "an error occured"})
    }
}

const deletePlaylist = async (req, res) => {
    const {id} = req.params

    console.log("suprrimer plalist", id)
    try{
        await deleteAllPlaylistsTracksSQL(id)
        await deletePlaylistSQL(id)

        return res.status(200)
    }catch(error){
        return res.status(500)
    }
}

export {
    createPlaylist,
    getUserPlaylists,
    addTrackPlaylist,
    getPlaylistTracks, 
    deletePlaylist
}