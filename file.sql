PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE user (
            user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            username TEXT,
            password TEXT,
            gender TEXT
          );
INSERT INTO user VALUES(1,'Narendra Modi','narendramodi','$2b$10$F/fLVmOjBnj0cj1y0tCS3uTJS6LCtLk1TaM5WqCVYC7ikMlIqY0re','male');
INSERT INTO user VALUES(2,'Joe Biden','JoeBiden','$2b$10$2are6Ba69oi/Cai4aT/VM.t7AO7TsQx/.Ogz.7XG4qjuMil0v80aq','male');
INSERT INTO user VALUES(3,'Serena Williams','serenawilliams','$2b$10$WeEWfd35RwSh7lXaVFlmFeOSZNdQHsByzuHKhni.nnF4vV8f4eYKe','female');
INSERT INTO user VALUES(4,'James Cameron','JimCameron','$2b$10$QmutsDpGkFNxaOTHAGij1./0C1rWj/xQVtlqOAhN4gL6UZ0YNxtyC','male');
INSERT INTO user VALUES(5,'Amitabh Bachchan','SrBachchan','$2b$10$yzngGkNmhuP34N1nnNsxve23iw7KZbOyi6nO4k41q9PIxtSihKmZq','male');
INSERT INTO user VALUES(6,'Ranbir Sindhu','SSRanbir','$2b$10$puGia8x9iV1YUYvH0CdnM.VrkG4JXog0i.86ZApzC/KgfUDt.C8R.','male');
INSERT INTO user VALUES(7,'Koushik S','koushik_s','$2b$10$Y.cLabkRTIbaAphs80GZEe4WDrVbYQ.C1HE3jeYHpFo86s3NA8ibO','male');
CREATE TABLE follower (
            follower_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            follower_user_id INT,
            following_user_id	INT,
            FOREIGN KEY(follower_user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(following_user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
INSERT INTO follower VALUES(1,1,2);
INSERT INTO follower VALUES(2,1,3);
INSERT INTO follower VALUES(3,1,4);
INSERT INTO follower VALUES(4,2,1);
INSERT INTO follower VALUES(5,2,4);
INSERT INTO follower VALUES(6,3,5);
INSERT INTO follower VALUES(7,4,1);
INSERT INTO follower VALUES(8,4,2);
INSERT INTO follower VALUES(9,4,3);
INSERT INTO follower VALUES(10,4,5);
INSERT INTO follower VALUES(11,5,1);
INSERT INTO follower VALUES(12,5,3);
CREATE TABLE tweet (
            tweet_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet TEXT,
            user_id	INT,
            date_time	DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
          );
INSERT INTO tweet VALUES(1,'Looking forward to a unique interaction with youngsters, their parents and teachers.',1,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(2,'On the way to the rally in Kanyakumari, caught a glimpse of the majestic Vivekananda Rock Memorial and the grand Thiruvalluvar Statue.',1,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(3,'My Administration is working to get America vaccinated as quickly as possible. Tune in as I provide an update on our progress and the timeline moving forward.',2,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(4,'The American Jobs Plan is the largest American jobs investment since World War II.',2,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(5,'Greatness is knowing you can go further, no matter how far you have come.',3,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(6,'Victory is temporary, but joy is eternal. Grateful for all of the joyful moments, big and small.',3,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(7,'Oel ngati kameie, China! We are re excited to bring Avatar back to your big screens this weekend.',4,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(8,'Oel ngati kameie, Avatar fans.',4,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(9,'T 3860 - happiness is nothing more than good health and a bad memory ..',5,'2021-04-07 14:50:15');
INSERT INTO tweet VALUES(10,'T 3859 - do something wonderful, people may imitate it ..',5,'2021-04-07 14:50:19');
INSERT INTO tweet VALUES(11,'I found myself thinking back to my own early youth, to the first shock of my encounter',6,'2021-04-07 18:05:36');
INSERT INTO tweet VALUES(12,'The Mornings...',2,'2025-06-30 05:26:41');
CREATE TABLE reply (
            reply_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet_id INT,
            reply	TEXT,
            user_id INT
            date_time	DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
          );
INSERT INTO reply VALUES(1,1,'We are together not just because we are a part of the same team',1);
INSERT INTO reply VALUES(2,1,'We know whom to call when we need a few extra runs!',1);
INSERT INTO reply VALUES(3,1,'Ready to don the Blue and Gold',1);
INSERT INTO reply VALUES(4,2,'When you see it..',1);
INSERT INTO reply VALUES(5,2,'A lot of people make the mistake of just hopping around on jobs a whole lot...',2);
INSERT INTO reply VALUES(6,3,'This is the secret to getting good at a new skill: consistency. Proud of my man Rich and his dedication to learning German.',2);
INSERT INTO reply VALUES(7,3,'Proud to say i haveve donated to this and you should too!',3);
INSERT INTO reply VALUES(8,4,'If you are reading this and you started, are in the middle of, or have finished ',3);
INSERT INTO reply VALUES(9,4,'Missed out on the series? Visit the link below and stream the series on-demand, and at your convenience.',3);
INSERT INTO reply VALUES(10,5,'Register and join us for educational sessions, tech panels, and the latest on MongoDB.',3);
INSERT INTO reply VALUES(11,6,'Always having our back!',4);
INSERT INTO reply VALUES(12,7,'A strong display with bat and ball and we have won the series with a game to play!',4);
INSERT INTO reply VALUES(13,8,'I am busy gathering information on the 12 crore jobs',4);
INSERT INTO reply VALUES(14,9,'This little girl challenges age old gender discrimination ingrained in our lives',5);
INSERT INTO reply VALUES(15,10,'if you had a twitter before 2020 rt this',5);
CREATE TABLE like (
            like_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            tweet_id INT,
            user_id INT
            date_time	DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
            FOREIGN KEY(tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE
          );
INSERT INTO "like" VALUES(1,1,2);
INSERT INTO "like" VALUES(2,1,5);
INSERT INTO "like" VALUES(3,1,4);
INSERT INTO "like" VALUES(4,2,2);
INSERT INTO "like" VALUES(5,2,5);
INSERT INTO "like" VALUES(6,2,1);
INSERT INTO "like" VALUES(7,3,1);
INSERT INTO "like" VALUES(8,3,4);
INSERT INTO "like" VALUES(9,4,1);
INSERT INTO "like" VALUES(10,4,4);
INSERT INTO "like" VALUES(11,4,3);
INSERT INTO "like" VALUES(12,5,4);
INSERT INTO "like" VALUES(13,5,5);
INSERT INTO "like" VALUES(14,6,1);
INSERT INTO "like" VALUES(15,6,5);
INSERT INTO "like" VALUES(16,7,1);
INSERT INTO "like" VALUES(17,7,2);
INSERT INTO "like" VALUES(18,8,2);
INSERT INTO "like" VALUES(19,8,1);
INSERT INTO "like" VALUES(20,8,4);
INSERT INTO "like" VALUES(21,9,3);
INSERT INTO "like" VALUES(22,9,5);
INSERT INTO "like" VALUES(23,10,5);
INSERT INTO "like" VALUES(24,10,3);
INSERT INTO "like" VALUES(25,10,4);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('user',7);
INSERT INTO sqlite_sequence VALUES('follower',12);
INSERT INTO sqlite_sequence VALUES('tweet',12);
INSERT INTO sqlite_sequence VALUES('reply',15);
INSERT INTO sqlite_sequence VALUES('like',25);
COMMIT;
