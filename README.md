<h1>Tàipo</h1>

<p>
<img src="https://img.shields.io/badge/Language-Typescript-3178C6.svg?logo=typescript"/>
<img src="https://img.shields.io/badge/Powered%20by-React-5ED3F3.svg?logo=react"/>
<img src="https://img.shields.io/badge/Style-SCSS-CF649A.svg?logo=sass"/>
<img src="https://img.shields.io/badge/Server-Express-333.svg?logo=express"/>
<img src="https://img.shields.io/badge/Database-MongoDB-13AA52.svg?logo=mongodb"/>
<img src="https://img.shields.io/badge/Auth-Firebase-FFCB2B.svg?logo=firebase"/>
<img src="https://img.shields.io/badge/Multiplayer-ON-success.svg?logo=riotgames"/>
<a href="https://app.netlify.com/sites/play-taipo/deploys">
<img src="https://img.shields.io/badge/Netlify-Live-3FA7BD.svg?logo=netlify">
<img src="https://img.shields.io/badge/Heroku-Live-79589F.svg?logo=heroku">
</a>
</p>

- [About ℹ](#about-ℹ)
- [Demo video 🎬](#demo-video-)
- [Features 💡](#features-)
- [Future plans 📃](#future-plans-)
- [Tech Stack 🛠](#tech-stack-)
  - [Front-end](#front-end)
  - [Back-end](#back-end)

---

## About ℹ

Multiplayer **typing game** that will take your mistakes to the next level.

It's 💯 free! [Play now](https://play-taipo.netlify.app/) 👈

A **solo project** built in **1 week**, from idea to delivery. The goal was to experience a complete development workflow, making use of **modern technologies** and **best practices**.

<a href="https://play-taipo.netlify.app/">
  <img width="100%" src="./readme-assets/taipo-screens-banner.png">
</a>

**Type the sentence** as fast as you can. Look out for the **typos** , some letters won't be the ones you expect! 😵

If you are in a rush you can practice alone, as a **guest**.

Want to play with a **random opponent**? **Sign up** via Google, Facebook or GitHub: the choice is yours! 🔑

If you are feeling lucky you can even **share a code** with a **friend** to play together. 🤝

## Demo video 🎬

Grab some popcorns and enjoy a short [cinematic montage](https://www.youtube.com/watch?v=xHpyR43vOwg) of the main features 👇

[![Imgur](./readme-assets/taipo-youtube.png)](https://www.youtube.com/watch?v=xHpyR43vOwg)

This video was created to **showcase the product** to possible stakeholders and investors, using [Shotcut](https://shotcut.org/) and [Audacity](https://www.audacityteam.org/). 💲

## Features 💡

**Fast and realtime**, will require speed and reflexes. Players can see how well is their opponent doing.
| Multiplayer | Social Login | Landing page |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| <img width="250px" src="./readme-assets/taipo-gameplay-small.gif" alt="gameplay"> | <img width="250px" src="./readme-assets/taipo-login-small.gif" alt="social login"> | <img width="250px" src="./readme-assets/landing-page.gif" alt="landing page"> |

All the game logic is handled on the server, making **cheating** impossible.

Users don't need to fill in any **forms** to start playing.

[React router](https://reactrouter.com/) prevents unhautorized users from accessing protected content.

## Future plans 📃

This app is still in active development, here are **some ideas** I'm working on:

- [ ] **Leaderboard** functionality
- [ ] **Tutorial** to improve UX
- [ ] **Test** both back-end and front-end

## Tech Stack 🛠

### Front-end

**Built with** [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/) and [Sass](https://sass-lang.com/). State management done with [Rxjs](https://rxjs.dev/), authentication with [Firebase](https://firebase.google.com/). Animations with [GSAP](https://greensock.com/gsap/) and sounds with [Howler.js](https://howlerjs.com/).

**Deployed** on [Netlify](https://www.netlify.com/).

### Back-end

**Powered by** [socket.io](https://socket.io/) living on an [Express](https://expressjs.com/) server. Data is handled to a [mongoose](https://mongoosejs.com/) model and stored in a [MongoDB](https://www.mongodb.com/) database.

**Deployed** using [Heroku](https://www.heroku.com/).
