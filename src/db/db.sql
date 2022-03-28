#use youtube_clone;


/* CREATE TABLE users(
    username VARCHAR(25) NOT NULL,
    userId INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profileImage VARCHAR(255),
    joinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId),
    UNIQUE(email),
    PRIMARY KEY(userId)
);  */


/* INSERT INTO users(username,email,password) VALUES(
    "yadollah","yado@gmail.com","12345"
);
INSERT INTO users(username,email,password,profileImage) VALUES(
    "yadollah2","yado@222gmail.com","12322245","htt22ps://fsfsd.com"
); */

#DROP TABLE users;
#DELETE FROM users WHERE userId>0;
#SELECT * FROM users;
#SELECT * FROM users WHERE email='ali@gmail.com' AND password='123456';

/* CREATE TABLE videos(
    videoId INT NOT NULL AUTO_INCREMENT,
    videoUrl VARCHAR(255) NOT NULL,
    thumbnailUrl VARCHAR(255) NOT NULL,
    userId INT NOT NULL references users(userId),
    uploadDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(videoId)
); */

#INSERT INTO videos (videoUrl,thumbnailUrl,userId) VALUES('video url','thumbnail url',80);
SELECT * FROM videos;
#DELETE FROM videos WHERE userId>0;