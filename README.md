<h1>TÃ ipo</h1>

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
</a>
<img src="https://img.shields.io/badge/Heroku-Live-79589F.svg?logo=heroku">
</p>

- [About â¹](#about-â¹)
- [Demo video ð¬](#demo-video-)
- [Features ð¡](#features-)
- [Future plans ï¿½](#future-plans-)
- [Tech Stack ð ](#tech-stack-)
- [Contributing ð¤](#contributing-)

---

## About â¹

Multiplayer **typing game** that will take your mistakes to the next level.

Get a **sentence** and type it as fast as you can. Look out for the **typos**, some letters won't be the ones you expect! ðµ

It's ð¯ free! [Play now](https://play-taipo.netlify.app/) ð

<a href="https://play-taipo.netlify.app/">
  <img title="play now" width="100%" src="./readme-assets/taipo-screens-banner.png" alt="screenshots">
</a>

## Demo video ð¬

Grab some popcorns and enjoy a short [cinematic montage](https://www.youtube.com/watch?v=xHpyR43vOwg) of the app ð

<a href="https://www.youtube.com/watch?v=xHpyR43vOwg">
<img title="watch video" src="./readme-assets/taipo-youtube.png" alt="youtube preview">
</a>

This video was created to **showcase** the product to potential **stakeholders** and **investors**, using [Shotcut](https://shotcut.org/) and [Audacity](https://www.audacityteam.org/). ð²

## Features ð¡

| Multiplayer                                                                                           | Social Login                                                                                            | Landing page                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| <img title="multiplayer" width="250px" src="./readme-assets/taipo-gameplay-small.gif" alt="gameplay"> | <img title="social login" width="250px" src="./readme-assets/taipo-login-small.gif" alt="social login"> | <img title="landing page" width="250px" src="./readme-assets/landing-page.gif" alt="landing page"> |

**Fast and realtime**, will require speed and reflexes. Players can see the progress of their opponent. ð

Available **game modes**:

- play as a **guest** ð¥±
- meet a **random opponent** ð¨
- challenge a **friend** ð

You can access the multiplayer modes by **signing up** via [Google](https://firebase.google.com/docs/auth/web/google-signin), [Facebook](https://firebase.google.com/docs/auth/web/facebook-login) or [GitHub](https://firebase.google.com/docs/auth/web/github-auth). ð

[React router](https://reactrouter.com/) prevents unhautorized users from accessing protected content. ð§­

All the game logic is handled on the server, making **cheating** a non-issue. ð¡

## Future plans ð­

This app is still in active development, here are **some ideas** I'm working on:

- [ ] **Leaderboard** functionality
- [ ] **Tutorial** to improve UX
- [ ] **Test** both back-end and front-end

## Tech Stack ð 

**Front end** built with [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), and [Sass](https://sass-lang.com/). State management done with [Rxjs](https://rxjs.dev/), authentication with [Firebase](https://firebase.google.com/). Animations with [GSAP](https://greensock.com/gsap/) and sounds with [Howler.js](https://howlerjs.com/). **Deployed** on [Netlify](https://www.netlify.com/).

<!-- front end stack logos -->

<p>
  <img title="typescript" width ='32px' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/typescript.svg'>
  <img title="react" width ='32px' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/reactjs.svg'>  
  <img title="sass" width ='32px' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/sass.svg'>
  <img title="rxjs" width ='32px' src ='https://cdn.worldvectorlogo.com/logos/rxjs-1.svg'>
  <img title="firebase" width ='32px' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/firebase.svg'>
  <img title="gsap" width ='32px' src ='https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg'>
  <img title="howler.js" width ='32px' src ='https://s3.amazonaws.com/appforest_uf/f1511101808452x248499521985650050/howlericon.png'>
  <img title="netlify" width ='32px' src ='https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png'>
</p>

**Back end** written in [Typescript](https://www.typescriptlang.org/), powered by [socket.io](https://socket.io/) living on an [Express](https://expressjs.com/) server. Data is handed to a [mongoose](https://mongoosejs.com/) model and stored in a [MongoDB](https://www.mongodb.com/) database. **Deployed** via [Heroku](https://www.heroku.com/).

<!-- back end tech logos -->

<p>
  <img title="typescript" width ='32px' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/typescript.svg'>
  <img title="socket.io" width ='32px' src ='https://cdn.worldvectorlogo.com/logos/socket-io.svg'>
  <img title="express" width ='32px' src ='https://raw.githubusercontent.com/rahulbanerjee26/githubAboutMeGenerator/main/icons/express.svg'>
  <img title="MongoDB" width ='32px' src ='https://img.icons8.com/color/452/mongodb.png'>
  <img title="heroku" width ='32px' src ='https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/heroku.png'>
</p>

## Contributing ð¤

To start the development **server** [install MongoDB](https://docs.mongodb.com/manual/administration/install-community) before executing these commands:

```bash
$ cd server
$ cp .env.example .env
$ npm install
$ npm run dev
```

You can also use [Mongo Atlas](https://www.mongodb.com/cloud/atlas) and change the connection string in `.env`. ð¡

---

To start the **client** first get the **API keys** from [Firebase console](https://console.firebase.google.com/) and then run:

```bash
$ cd client
$ cp .env.example .env
$ npm install
$ npm start
```

Happy hacking and remember: **PRs are welcome**! ð
