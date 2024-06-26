CREATE TABLE tracks (
     _id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(50) NOT NULL,
     artist VARCHAR(50) NOT NULL,
     album VARCHAR(50),
     cover VARCHAR(255) NOT NULL,
     audio VARCHAR(255) NOT NULL,
     cover_cloudinary_id VARCHAR(255) NOT NULL,
     audio_cloudinary_id VARCHAR(255) NOT NULL,
     user_id VARCHAR(255) NOT NULL,
     PRIMARY KEY (_id)
);

ALTER TABLE tracks
ADD user_id VARCHAR(255) NOT NULL;

ALTER TABLE tracks
MODIFY COLUMN audio_cloudinary_id VARCHAR(255) NOT NULL;

SELECT * FROM tracks_artists WHERE artist_id = (SELECT artist_id FROM tracks_artists WHERE track_id = 3)

TRUNCATE albums;
TRUNCATE albums_artists;
TRUNCATE albums_covers;
TRUNCATE artists;
TRUNCATE covers;
TRUNCATE tracks;
TRUNCATE tracks_albums;
TRUNCATE tracks_artists;

SELECT * FROM albums;
SELECT * FROM albums_artists;
SELECT * FROM albums_covers;
SELECT * FROM artists;
SELECT * FROM covers;
SELECT * FROM tracks;
SELECT * FROM tracks_albums;
SELECT * FROM tracks_artists;

INSERT INTO tracks (title, artist, album, cover, audio, cover_cloudinary_id, audio_cloudinary_id, user_id) VALUES 
("Sunrise",
"Kid Cudi",
"KIDS SEE GHOST 2",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671876602/dngwigu22djpe87ws2ae.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671876604/bickp6gm88cs9h06gvh7.mp3",
"dngwigu22djpe87ws2ae",
"bickp6gm88cs9h06gvh7",
"63a6e37b31be19df34463d5f"),
("5:30",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671883264/glbf9m6efq73syxvnvor.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671883266/yodcocpur6vgkl2evs4o.mp3",
"glbf9m6efq73syxvnvor",
"yodcocpur6vgkl2evs4o",
"63a6e37b31be19df34463d5f"),
("New Body (ft. Nicki Minaj & Ty Dolla Sign)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671883293/nc2bhs3wztlyocxr42fu.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671883295/fhjylx4gvt33hnsiyidd.mp3",
"nc2bhs3wztlyocxr42fu",
"fhjylx4gvt33hnsiyidd",
"63a6e37b31be19df34463d5f"),
("fafo",
"Zack Fox",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671883324/nhkjpreczabgkayhl65l.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671883326/meqx4ada4iogh5yabpwr.mp3",
"nhkjpreczabgkayhl65l",
"meqx4ada4iogh5yabpwr",
"63a6e37b31be19df34463d5f"),
("Dix",
"Enfantdepauvres",
"EDP (saison 1)",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671883867/wonwaoytv9ho6db8p7nb.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671883868/gvweht68u38v9zp22kld.mp3",
"wonwaoytv9ho6db8p7nb",
"gvweht68u38v9zp22kld",
"63a34dccd40e296af3f273ec"),
("CALLDROPS (ft. Kodak Black)",
"A$AP ROCKY",
"Testing",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671883369/xntai3ymqm8zwmfz64gu.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671883371/e3ls4auu3j51kaevml3j.mp3",
"xntai3ymqm8zwmfz64gu",
"e3ls4auu3j51kaevml3j",
"63a6e37b31be19df34463d5f"),
("PROBLEM",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671890204/jqb4ux7chzcoivhzbdga.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671890205/kdvasflssxbnnirpbuaq.mp3",
"jqb4ux7chzcoivhzbdga",
"kdvasflssxbnnirpbuaq",
"63a6e37b31be19df34463d5f"),
("Deja Vu",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671890518/nnuia0aqrit5ygttzmgn.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671890520/eeqckeoidpjecysle70c.mp3",
"nnuia0aqrit5ygttzmgn",
"eeqckeoidpjecysle70c",
"63a6e37b31be19df34463d5f"),
("fake bitch",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671891201/e0gauys6vpdsuozyyp8e.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671891203/zdb3ji731nxuynhmzfvl.mp3",
"e0gauys6vpdsuozyyp8e",
"zdb3ji731nxuynhmzfvl",
"63a6e37b31be19df34463d5f"),
("Does This Ski Mask Make Me Look Fat?",
"JPEGMAFIA",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671891342/quaedeueplhpu5fjowun.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671891344/fclpuevcqnmaqpdmysfx.mp3",
"quaedeueplhpu5fjowun",
"fclpuevcqnmaqpdmysfx",
"63a6e37b31be19df34463d5f"),
("ULTRASOUNDS (ft. Travis Scott)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671891606/htxt9afhn4qxwegoirar.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671891608/ivxsp5nwbo7ku0ivzoxn.mp3",
"htxt9afhn4qxwegoirar",
"ivxsp5nwbo7ku0ivzoxn",
"63a6e37b31be19df34463d5f"),
("Sounds (ft. Juice WRLD & Travis Scott)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671891947/fq938hswtyp4ylqlfuac.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671891949/aezxklou2143eh8mx9i8.mp3",
"fq938hswtyp4ylqlfuac",
"aezxklou2143eh8mx9i8",
"63a6e37b31be19df34463d5f"),
("Powerful (ft. Swizz Beats)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671892583/nt4pywcnhfg6x8slhw9r.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671892585/lo62fddvqxu2yg1xfvdo.mp3",
"nt4pywcnhfg6x8slhw9r",
"lo62fddvqxu2yg1xfvdo",
"63a6e37b31be19df34463d5f"),
("Only Ye (ft. Tyga)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671892861/obhduagmge2g5icwf6d8.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671892862/qchzqimtpg4ssmfsogfs.mp3",
"obhduagmge2g5icwf6d8",
"qchzqimtpg4ssmfsogfs",
"63a6e37b31be19df34463d5f"),
("Tongues",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671893080/sgddwgsecn8wet545zbw.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671893081/bdvjwacm2npre3lyjdkh.mp3",
"sgddwgsecn8wet545zbw",
"bdvjwacm2npre3lyjdkh",
"63a6e37b31be19df34463d5f"),
("Sunrise",
"Kid Cudi",
"KIDS SEE GHOST 2",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671894041/w9nzy2cyiqoydtfkstyt.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671894043/yrqake1z6yfiya9kqxqe.mp3",
"w9nzy2cyiqoydtfkstyt",
"yrqake1z6yfiya9kqxqe",
"63a34dccd40e296af3f273ec"),
("West Side Gunn's Interlude",
"Joyce Wrice Ft. Westside Gunn & ESTA",
"Overgrown",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671909023/kflui6w8r2hqjmuafsga.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671909025/iu03rz5huiko0cywnzxj.mp3",
"kflui6w8r2hqjmuafsga",
"iu03rz5huiko0cywnzxj",
"63a34dccd40e296af3f273ec"),
("Life Of The Party (ft. Andre 3000)",
"Kanye West",
"Era",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1672592946/v8r1o3i0hc3w7o9jjxtn.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1672592948/izlxgxgh7xui0vbnjql5.mp3",
"v8r1o3i0hc3w7o9jjxtn",
"izlxgxgh7xui0vbnjql5",
"63a6e37b31be19df34463d5f"),
("Hard Horn Nightmare",
"Kanye West",
"Era",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1672593140/wprfmbgarddxbnd0xooi.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1672593142/yvcy3rwmsedas6tjnkt6.mp3",
"wprfmbgarddxbnd0xooi",
"yvcy3rwmsedas6tjnkt6",
"63a6e37b31be19df34463d5f"),
("Run It Up",
"Kanye West",
"Era",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1672593329/nesh6dukinbibb7wvokv.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1672593331/wc6vqxpppozh4cacnjao.mp3",
"nesh6dukinbibb7wvokv",
"wc6vqxpppozh4cacnjao",
"63a6e37b31be19df34463d5f"),
("Beautiful Life",
"Kanye West",
"Era",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1672593422/r11ky8q39ihtslmpuj8u.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1672593424/vdaaattnjamlhlbqcjf8.mp3",
"r11ky8q39ihtslmpuj8u",
"vdaaattnjamlhlbqcjf8",
"63a6e37b31be19df34463d5f"),
("Heartbreaker",
"Kanye West",
"Era",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1672593485/mljqhk5w0gktn232amaw.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1672593488/sclbd4klihby8wvkmjre.mp3",
"mljqhk5w0gktn232amaw",
"sclbd4klihby8wvkmjre",
"63a6e37b31be19df34463d5f"),
("fafo",
"Zack Fox",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671883324/nhkjpreczabgkayhl65l.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671883326/meqx4ada4iogh5yabpwr.mp3",
"nhkjpreczabgkayhl65l",
"meqx4ada4iogh5yabpwr",
"63a34dccd40e296af3f273ec"),
("Damn Come On",
"Kanye West",
"Era",
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1672769208/zox62dcu5igub3qiuyvr.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1672769210/yj3sauluh7pu4k0pyl8m.mp3",
"zox62dcu5igub3qiuyvr",
"yj3sauluh7pu4k0pyl8m",
"63a6e37b31be19df34463d5f"),
("Flowers",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1673336274/pqfg50h9pbzw1ur5aaj4.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1673336275/xjwwrkfwv3hbj5nkw5p8.mp3",
"pqfg50h9pbzw1ur5aaj4",
"xjwwrkfwv3hbj5nkw5p8",
"63a6e37b31be19df34463d5f"),
("You was right (ft. Tyler The Creator)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1673336498/qmxrgcjmqpbyp1echd9l.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1673336500/hewwut3tk2bqyufy9o8u.mp3",
"qmxrgcjmqpbyp1echd9l",
"hewwut3tk2bqyufy9o8u",
"63a6e37b31be19df34463d5f"),
("Welcome to my life",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1673469913/jhjgnr0yewbho7zadm2w.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1673469915/vt1epqvflrnk2jgcvewb.mp3",
"jhjgnr0yewbho7zadm2w",
"vt1epqvflrnk2jgcvewb",
"63a6e37b31be19df34463d5f"),
("Mr. Miyagi",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1673624135/r6cezlnjumpgd6rhkt5e.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1673624137/dwqk5yixaba9lmyic938.mp3",
"r6cezlnjumpgd6rhkt5e",
"dwqk5yixaba9lmyic938",
"63a6e37b31be19df34463d5f"),
("FACE DOWN (ft. Quavo & Lil Yachty)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1673624268/drrmrvadcnpliicr2gki.jpg",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1673624270/dz7tomvphclx6qq4ncqd.mp3",
"drrmrvadcnpliicr2gki",
"dz7tomvphclx6qq4ncqd",
"63a6e37b31be19df34463d5f"),
("after you",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1673624315/toftraojq4bp7gku21mb.webp",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1673624317/ra5hdlpf4uivfcfritcj.mp3",
"toftraojq4bp7gku21mb",
"ra5hdlpf4uivfcfritcj",
"63a6e37b31be19df34463d5f"),
("Hold Tight (ft. Young Thug & Migos)",
"Kanye West",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1673624415/g0owlk8kcnvhyaq8a9yi.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1673624421/wxtck1hytxjcyswcy5al.mp3",
"g0owlk8kcnvhyaq8a9yi",
"wxtck1hytxjcyswcy5al",
"63a6e37b31be19df34463d5f"),
("Ma petite soeur est une sorcière",
"Claude Marc",
null,
"https://res.cloudinary.com/dsszh0cfy/image/upload/v1671909861/k8iyr1bocoklxtlzr0ol.png",
"https://res.cloudinary.com/dsszh0cfy/video/upload/v1671909864/yaobmxedbc92jkh5xohk.mp3",
"k8iyr1bocoklxtlzr0ol",
"yaobmxedbc92jkh5xohk",
"63a34dccd40e296af3f273ec")


____________________________________________________________________________________________________________________________________

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
     PRIMARY KEY (_id)
);


CREATE TABLE tracks (
     _id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(50) NOT NULL,
     audio VARCHAR(255) NOT NULL,
     audio_cloudinary_id VARCHAR(255) NOT NULL,
     artist_id INT,
     album_id INT,
     cover VARCHAR(255),
     cover_cloudinary_id VARCHAR(255),
     user_id INT NOT NULL,
     PRIMARY KEY (_id),
     FOREIGN KEY (artist_id) REFERENCES artists(_id),
     FOREIGN KEY (album_id) REFERENCES albums(_id)
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

CREATE TABLE playlists (
     _id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(50) NOT NULL,
     user_id INT,
     FOREIGN KEY (user_id) REFERENCES users(_id),
     PRIMARY KEY (_id)
);

CREATE TABLE playlists_tracks (
     track_id INT,
     playlist_id INT,
     FOREIGN KEY (track_id) REFERENCES tracks(_id),
     FOREIGN KEY (playlist_id) REFERENCES playlists(_id)
);

ALTER TABLE tracks
ADD cover VARCHAR(255),
ADD cover_cloudinary_id VARCHAR(255);

INSERT INTO 

  SELECT tracks.*, a.name AS artist_name, al.title AS album_title, al.cover AS cover_album
  FROM tracks
  LEFT JOIN artists a ON a._id = track.artist_id 
  LEFT JOIN albums al ON al._id = track.album_id
  INNER JOIN playlists_tracks ON tracks._id = playlists_tracks.track_id
  WHERE playlists_tracks.playlist_id = 3