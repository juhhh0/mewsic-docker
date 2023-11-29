DROP DATABASE IF EXISTS mewsic_sql;

CREATE DATABASE mewsic_sql;

USE mewsic_sql;

CREATE TABLE users (
    _id INT NOT NULL AUTO_INCREMENT,
    email varchar(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role BOOLEAN NOT NULL DEFAULT 0,
    verified BOOLEAN NOT NULL DEFAULT 0,
    reset_token VARCHAR(255),
    reset_token_created_at INT,
    verif_token VARCHAR(255),
    verif_token_created_at INT,
    pseudo VARCHAR(50) NOT NULL UNIQUE,
    avatar VARCHAR(255),
    avatar_cloudinary_id VARCHAR(255),
    PRIMARY KEY (_id)
);

CREATE TABLE artists (
     _id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL,
     PRIMARY KEY (_id)
);

CREATE TABLE albums (
     _id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(50) NOT NULL,
     cover VARCHAR(255),
     cover_cloudinary_id VARCHAR(255),
     PRIMARY KEY (_id)
);

CREATE TABLE tracks (
     _id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(50) NOT NULL,
     audio VARCHAR(255) NOT NULL,
     audio_cloudinary_id VARCHAR(255) NOT NULL,
     artist_id INT,
     album_id INT,
     public BOOLEAN NOT NULL DEFAULT 0,
     cover VARCHAR(255),
     cover_cloudinary_id VARCHAR(255),
     owner_id INT NOT NULL,
     PRIMARY KEY (_id),
     FOREIGN KEY (artist_id) REFERENCES artists(_id),
     FOREIGN KEY (album_id) REFERENCES albums(_id),
     FOREIGN KEY (owner_id) REFERENCES users(_id)
);

CREATE TABLE users_tracks(
     user_id INT,
     track_id INT,
     FOREIGN KEY (user_id) REFERENCES users(_id),
     FOREIGN KEY (track_id) REFERENCES tracks(_id)
);

CREATE TABLE playlists (
     _id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(50) NOT NULL,
     user_id INT,
     PRIMARY KEY (_id),
     FOREIGN KEY (user_id) REFERENCES users(_id)
);

CREATE TABLE playlists_tracks (
     track_id INT,
     playlist_id INT,
     FOREIGN KEY (track_id) REFERENCES tracks(_id),
     FOREIGN KEY (playlist_id) REFERENCES playlists(_id)
);