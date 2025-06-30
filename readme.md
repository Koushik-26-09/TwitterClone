# 🐦 TwitterClone

A simple Twitter-like social media app built with **Node.js**, **Express**, **SQLite**, and a frontend using **HTML**, **CSS**, and **JavaScript**.

---

## 📌 Features

- User Registration & Login (with JWT Authentication)
- View personal tweet feed
- Post new tweets
- View followers and following lists
- View your own tweets with like and reply counts
- View tweet details with likes and replies
- Delete your own tweets
- Responsive frontend with mobile-friendly sidebar navigation

---

## 📦 Technologies Used

- **Backend:** Node.js, Express, SQLite, JWT
- **Frontend:** HTML, CSS, JavaScript, FontAwesome
- **Database:** SQLite

---

## 🚀 Setup Instructions

### 🔧 Install Dependencies

### 🗄️ Start the Server


- The backend will start at `http://localhost:3000`.

---

## 🌐 Running the App

- Open `public/index.html` in your browser.
- Use the app by registering a new user or logging in.
- Explore your feed, create tweets, view followers/following, and manage posts.

---

## 📑 API Endpoints

| Method | Endpoint                        | Description                         |
|:--------|:--------------------------------|:-------------------------------------|
| `POST`   | `/register/`                    | Register a new user                  |
| `POST`   | `/login/`                       | User login                           |
| `GET`    | `/user/tweets/feed/`            | Get tweet feed for logged-in user    |
| `GET`    | `/user/following/`              | List of users the current user follows |
| `GET`    | `/user/followers/`              | List of followers                    |
| `GET`    | `/tweets/:tweetId/`             | Tweet details (likes, replies, date) |
| `GET`    | `/tweets/:tweetId/likes/`       | List of users who liked a tweet      |
| `GET`    | `/tweets/:tweetId/replies/`     | List of replies for a tweet          |
| `GET`    | `/user/tweets/`                 | List of tweets by logged-in user     |
| `POST`   | `/user/tweets/`                 | Create a new tweet                   |
| `DELETE` | `/tweets/:tweetId/`             | Delete a tweet                       |

---

## ✅ License

This project is for educational purposes.

---

## 🙌 Credits

Developed by [Koushik](https://github.com/Koushik-26-09)

# 🐦 TwitterClone named as SocialHub

![GitHub repo size](https://img.shields.io/github/repo-size/Koushik-26-09/TwitterClone)
![GitHub issues](https://img.shields.io/github/issues/Koushik-26-09/TwitterClone)
![GitHub last commit](https://img.shields.io/github/last-commit/Koushik-26-09/TwitterClone)
![License](https://img.shields.io/badge/license-MIT-blue)

---

