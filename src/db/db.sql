use youtube_clone;


/* CREATE TABLE users(
    username VARCHAR(25) NOT NULL,
    userId INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profileImage VARCHAR(255) NOT NULL,
    joinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(userId),
    UNIQUE(email),
    PRIMARY KEY(userId)
); */


/* INSERT INTO users(username,email,password,profileImage) VALUES(
    "yadollah","yado@gmail.com","12345","https://fsfsd.com"
);
INSERT INTO users(username,email,password,profileImage) VALUES(
    "yadollah2","yado@222gmail.com","12322245","htt22ps://fsfsd.com"
); */

#DROP TABLE users;
#DELETE FROM users WHERE userId>1;
#SELECT * FROM users;
SELECT * FROM users WHERE email='ali@gmail.com' AND password='123456';