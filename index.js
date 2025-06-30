const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const jwt = require('jsonwebtoken')
const path = require('path')
const bcrypt = require('bcrypt')
const dbpath = path.join(__dirname, 'twitterclone.db')
app.use(express.json())
let db = null;
app.use(express.static(path.join(__dirname, 'public')))
const initializeAndConnect = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server currently running at-> http://localhost:3000/')
    })
  } catch (e) {
    console.log('DBError: ', e.message)
  }
}

initializeAndConnect()

const authenticationToken = (req, res, next) => {
  let jwtToken
  const authHeader = req.headers['authorization']
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1]
  }
  if (jwtToken === undefined) {
    res.status(401).send({message:'Invalid JWT Token'})
  } else {
    jwt.verify(jwtToken, 'MY_SECRET_TOKEN', async (error, payload) => {
      if (error) {
        res.status(401).send({message:'Invalid JWT Token'})
      } else {
        req.username = payload.username;
        next()
      }
    })
  }
}
//api1
app.post('/register/', async (req, res) => {
  const {username, password, name, gender} = req.body
  const hashedPw = await bcrypt.hash(password, 10)
  const query = `select * from user where username=?`
  const dbUser = await db.get(query, [username])
  if (dbUser === undefined) {
    if (password.length < 6) {
      res.status(400).send({message:'Password is too short'})
    } else {
      const createUserquery = `INSERT INTO user
            (username,password,name,gender) 
            VALUES
            (?,?,?,?)`
      await db.run(createUserquery, [username, hashedPw, name, gender])
      res.status(200).send({message:'User created successfully'})
    }
  } else {
    res.status(400).send({message:'User already exists'})
  }
})
//api2
app.post('/login/', async (req, res) => {
  const {username, password} = req.body
  const query = `select * from user where username=?`
  const dbUser = await db.get(query, [username])
  if (dbUser === undefined) {
    res.status(400).send({message:'Invalid user'})
  } else {
    const isPasswordMatch = await bcrypt.compare(password, dbUser.password)
    if (isPasswordMatch) {
      const payload = {username: username}
      const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')
      res.send({jwtToken})
    } else {
      res.status(400).send({message:'Invalid password'})
    }
  }
})
//api3
app.get('/user/tweets/feed/', authenticationToken, async (req, res) => {
  const {username} = req
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;
  `
  const user = await db.get(getUserIdQuery, [username])
  const getFeedQuery = `
    SELECT 
      u.username AS username,
      t.tweet AS tweet,
      t.date_time AS dateTime
    FROM 
      follower f
    INNER JOIN 
      tweet t ON f.following_user_id = t.user_id
    INNER JOIN 
      user u ON u.user_id = t.user_id
    WHERE 
      f.follower_user_id = ?
    ORDER BY 
      t.date_time DESC
    LIMIT 4;
  `
  const feed = await db.all(getFeedQuery, [user.user_id])
  res.send(feed)
})
//api4
app.get('/user/following/', authenticationToken, async (req, res) => {
  const {username} = req
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;
  `
  const user = await db.get(getUserIdQuery, [username])
  const getFollowingQuery = `
    SELECT u.name 
    FROM follower f
    INNER JOIN user u ON f.following_user_id = u.user_id
    WHERE f.follower_user_id = ?;
  `
  const followingPeople = await db.all(getFollowingQuery, [user.user_id])
  res.send(followingPeople)
})
//api5
app.get('/user/followers/', authenticationToken, async (req, res) => {
  const {username} = req
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;
  `
  const user = await db.get(getUserIdQuery, [username])
  const getFollowersQuery = `
    SELECT u.name 
    FROM follower f
    INNER JOIN user u ON f.follower_user_id = u.user_id
    WHERE f.following_user_id = ?;
  `
  const followersList = await db.all(getFollowersQuery, [user.user_id])
  res.send(followersList)
})
//api6
app.get('/tweets/:tweetId/', authenticationToken, async (req, res) => {
  const {username} = req
  const {tweetId} = req.params
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;
  `
  const user = await db.get(getUserIdQuery, [username])
  const getFollowingQuery = `
    SELECT following_user_id 
    FROM follower 
    WHERE follower_user_id = ?;
  `
  const followingUsers = await db.all(getFollowingQuery, [user.user_id])
  const followingIds = followingUsers.map(each => each.following_user_id)
  const getTweetQuery = `
    SELECT * FROM tweet WHERE tweet_id = ?;
  `
  const tweet = await db.get(getTweetQuery, [tweetId])
  if (!tweet || !followingIds.includes(tweet.user_id)) {
    res.status(401).send({message:'Invalid Request'})
  } else {
    const getLikesCountQuery = `
      SELECT COUNT(*) AS likesCount 
      FROM like 
      WHERE tweet_id = ?;
    `
    const likesResult = await db.get(getLikesCountQuery, [tweetId])
    const getRepliesCountQuery = `
      SELECT COUNT(*) AS repliesCount 
      FROM reply 
      WHERE tweet_id = ?;
    `
    const repliesResult = await db.get(getRepliesCountQuery, [tweetId])
    const response = {
      tweet: tweet.tweet,
      likes: likesResult.likesCount,
      replies: repliesResult.repliesCount,
      dateTime: tweet.date_time,
    }
    res.send(response)
  }
})
//api7
app.get('/tweets/:tweetId/likes/', authenticationToken, async (req, res) => {
  const {username} = req
  const {tweetId} = req.params
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;
  `
  const user = await db.get(getUserIdQuery, [username])
  const getFollowingQuery = `
    SELECT following_user_id 
    FROM follower 
    WHERE follower_user_id = ?;
  `
  const followingUsers = await db.all(getFollowingQuery, [user.user_id])
  const followingIds = followingUsers.map(each => each.following_user_id)
  const getTweetQuery = `
    SELECT * FROM tweet WHERE tweet_id = ?;
  `
  const tweet = await db.get(getTweetQuery, [tweetId])
  if (!tweet || !followingIds.includes(tweet.user_id)) {
    res.status(401).send({message:'Invalid Request'})
  } else {
    const getLikesQuery = `
      SELECT u.username 
      FROM like l
      INNER JOIN user u ON l.user_id = u.user_id
      WHERE l.tweet_id = ?;
    `
    const likes = await db.all(getLikesQuery, [tweetId])
    const usernames = likes.map(each => each.username)
    res.send({likes: usernames})
  }
})
//api8
app.get('/tweets/:tweetId/replies/', authenticationToken, async (req, res) => {
  const {username} = req
  const {tweetId} = req.params
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;`
  const user = await db.get(getUserIdQuery, [username])
  const getFollowingQuery = `
    SELECT following_user_id 
    FROM follower 
    WHERE follower_user_id = ?;
  `
  const followingUsers = await db.all(getFollowingQuery, [user.user_id])
  const followingIds = followingUsers.map(each => each.following_user_id)
  const getTweetQuery = `
    SELECT * FROM tweet WHERE tweet_id = ?;`
  const tweet = await db.get(getTweetQuery, [tweetId])
  if (!tweet || !followingIds.includes(tweet.user_id)) {
    res.status(401).send({message:'Invalid Request'})
  } else {
    const getRepliesQuery = `
      SELECT u.name, r.reply 
      FROM reply r
      INNER JOIN user u ON r.user_id = u.user_id
      WHERE r.tweet_id = ?;`
    const replies = await db.all(getRepliesQuery, [tweetId])
    res.send({replies})
  }
})

//api9
app.get('/user/tweets/', authenticationToken, async (req, res) => {
  const {username} = req
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;  `
  const user = await db.get(getUserIdQuery, [username])
  const getTweetsQuery = `
    SELECT 
      t.tweet AS tweet,
      COUNT(DISTINCT l.like_id) AS likes,
      COUNT(DISTINCT r.reply_id) AS replies,
      t.date_time AS dateTime
    FROM 
      tweet t
    LEFT JOIN 
      like l ON t.tweet_id = l.tweet_id
    LEFT JOIN 
      reply r ON t.tweet_id = r.tweet_id
    WHERE 
      t.user_id = ?
    GROUP BY 
      t.tweet_id;`
  const tweets = await db.all(getTweetsQuery, [user.user_id])
  res.send(tweets)
})

//api10
app.post('/user/tweets/', authenticationToken, async (req, res) => {
  const {username} = req
  const {tweet} = req.body
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;
  `
  const user = await db.get(getUserIdQuery, [username])
  const postTweetQuery = `
    INSERT INTO tweet (tweet, user_id, date_time)
    VALUES (?, ?, CURRENT_TIMESTAMP);`
  await db.run(postTweetQuery, [tweet, user.user_id])
  res.send({message:'Created a Tweet'})
})
//api11
app.delete('/tweets/:tweetId/', authenticationToken, async (req, res) => {
  const {username} = req
  const {tweetId} = req.params
  const getUserIdQuery = `
    SELECT user_id FROM user WHERE username = ?;`
  const user = await db.get(getUserIdQuery, [username])
  const getTweetQuery = `
    SELECT * FROM tweet WHERE tweet_id = ? AND user_id = ?;`
  const tweet = await db.get(getTweetQuery, [tweetId, user.user_id])
  if (!tweet) {
    res.status(401).send({message:'Invalid Request'})
  } else {
    const deleteTweetQuery = `
      DELETE FROM tweet WHERE tweet_id = ?;`
    await db.run(deleteTweetQuery, [tweetId])
    res.send({message:'Tweet Removed'})
  }
})
module.exports = app;
