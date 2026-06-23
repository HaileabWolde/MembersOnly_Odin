CREATE TABLE users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   firstname VARCHAR (255),
   lastname  VARCHAR (255),
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 ),
   is_admin BOOLEAN DEFAULT FALSE,
   is_memeber BOOLEAN DEFAULT FALSE
);

INSERT INTO users(firstname, lastname, username, password)
VALUES ('Haileab', 'Woldemariam', 'woma', '14281234')

SELECT * from users
CREATE TABLE post  (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title VARCHAR(255),
	 content TEXT DEFAULT '',
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	creator_id INTEGER NOT NULL,
    CONSTRAINT fk_post_creator FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
)

INSERT INTO post(title, content, creator_id)
VALUES ('fUCKING UR MOTHER', 'i would like to fuck your mother' , '3')

DELETE  from post
DELETE  from users

SELECT * from post
CREATE TABLE "user_sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "user_sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


CREATE INDEX "IDX_session_expire" ON "user_sessions" ("expire");


//usernames
CREATE TABLE users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 )
);

SELECT
*
FROM users

SELECT
*
FROM post
SELECT 
    *
FROM user_sessions

DROP TABLE users 

DELETE FROM user_sessions;

