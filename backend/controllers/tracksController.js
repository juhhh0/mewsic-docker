import {
  createTrackSQL,
  getTracksByArtistSQL,
  getTracksArtistByArtistIdSQL,
  getTracksAlbumByAlbumIdSQL,
  getTracksByAlbumSQL,
  getTracksSQL,
  createUserTrackSQL,
  deleteTrackSQL,
  deleteUserTrackSQL,
  getTrackSQL,
  togglePublicTrackSQL,
  isLikedSQL,
  likeSQL,
  dislikeSQL,
  deleteUsersTracksByTrackSQL,
} from "../utils/sql/tracksSQL.js";
import {
  createArtistSQL,
  getArtistByNameSQL,
  deleteArtistSQL,
} from "../utils/sql/artistsSQL.js";
import {
  createAlbumSQL,
  deleteAlbumSQL,
  getAlbumByNameSQL,
  getAlbumSQL,
} from "../utils/sql/albumsSQL.js";

import cloudinary from "../utils/cloudinary.js";

const getTracks = async (req, res) => {
  const id = req.user;

  const tracks = await getTracksSQL(id);

  res.status(200).json(tracks);
};

const getTracksByArtist = async (req, res) => {
  const user_id = req.user;
  const { artist } = req.params;

  const tracks = await getTracksByArtistSQL(user_id, artist);

  res.status(200).json(tracks);
};

const getTracksByAlbum = async (req, res) => {
  const user_id = req.user;
  const { album } = req.params;

  const tracks = await getTracksByAlbumSQL(user_id, album);

  res.status(200).json(tracks);
};

const createTrack = async (req, res) => {
  const { title, artist, album } = req.body;
  const id = req.user;
  const files = req.files;

  let result = [];

  for (const [name, obj] of Object.entries(files)) {
    result.push(
      await cloudinary.uploader.upload(obj[0].path, {
        resource_type: "auto",
      })
    );
  }

  // Check empty fields
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (
    !result.filter((obj) => {
      return obj.resource_type === "video";
    })[0]
  ) {
    emptyFields.push("audio");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all the fields",
      fields: emptyFields,
    });
  }

  // Check Fields too long

  let tooLongFields = [];

  if(title.length >= 50 ){
    tooLongFields.push("title")
  }

  if(album.length >= 50 ){
    tooLongFields.push("album")
  }

  if(artist.length >= 50 ){
    tooLongFields.push("artist")
  }

  if(tooLongFields.length > 0){
    return res.status(400).json({
      error: "Some fields are too long, max 50 chars",
      fields: tooLongFields,
    });
  }

  try {
    let cover_url = result.filter((obj) => {
      return obj.resource_type === "image";
    })[0]?.secure_url;

    let cover_id = result.filter((obj) => {
      return obj.resource_type === "image";
    })[0]?.public_id;

    // Artist
    let existingArtist = [];
    if (artist) {
      existingArtist = await getArtistByNameSQL(artist);
      if (!existingArtist) {
        existingArtist = await createArtistSQL(artist);
      }
    }

    //Album
    let existingAlbum = [];
    if (album) {
      existingAlbum = await getAlbumByNameSQL(album);
      if (!existingAlbum) {
        existingAlbum = await createAlbumSQL(album, cover_url, cover_id);
      }
    }

    // Track
    const track = await createTrackSQL(
      title,
      result.filter((obj) => {
        return obj.resource_type === "video";
      })[0].secure_url,
      result.filter((obj) => {
        return obj.resource_type === "video";
      })[0].public_id,
      existingArtist._id,
      existingAlbum._id,
      cover_url && !album ? cover_url : "",
      cover_id && !album ? cover_id : "",
      id
    );

    // User Track
    await createUserTrackSQL(id, track?._id);

    res.status(200).json(track);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTrack = async (req, res) => {
  const user_id = req.user;
  const { id } = req.params;

  try {
    await deleteUserTrackSQL(user_id, id);

    // const otherUsersTracks = await getUsersTracksSQL(id);

    const track = await getTrackSQL(id);

    await deleteUsersTracksByTrackSQL(id);

    if (user_id === track.owner_id) {
      const artist_id = track.artist_id;
      const album_id = track.album_id;

      await cloudinary.uploader.destroy(track.audio_cloudinary_id, {
        resource_type: "video",
      });

      if (track?.cover_cloudinary_id) {
        await cloudinary.uploader.destroy(track.cover_cloudinary_id);
      }

      await deleteTrackSQL(id);

      const albumsTracks = await getTracksAlbumByAlbumIdSQL(album_id);

      if (albumsTracks.length == 0) {
        const album = await getAlbumSQL(album_id);

        if (album?.cover_cloudinary_id) {
          await cloudinary.uploader.destroy(album.cover_cloudinary_id);
        }

        await deleteAlbumSQL(album_id);
      }

      const artistsTracks = await getTracksArtistByArtistIdSQL(artist_id);

      if (artistsTracks.length == 0) {
        await deleteArtistSQL(artist_id);
      }
    }

    return res.status(200).json({
      statut: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      statut: false,
    });
  }
};

const togglePublicTrack = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user;

  const track = await getTrackSQL(id);

  const isOwner = user_id === track.owner_id;

  if (isOwner) {
    await togglePublicTrackSQL(id);
  }
  return res.status(200).json();
};

const isLiked = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const liked = await isLikedSQL(id, user);

  return res.status(200).json(liked);
};

const likeTrack = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const liked = await isLikedSQL(id, user);

  if (liked) {
    await dislikeSQL(user, id);
  } else {
    await likeSQL(user, id);
  }

  return res.status(200).json();
};

export {
  getTracks,
  getTracksByArtist,
  getTracksByAlbum,
  createTrack,
  deleteTrack,
  togglePublicTrack,
  isLiked,
  likeTrack,
};
