## Project name

**Tàipo**

![tàipo](https://i.imgur.com/t9vX4JL.png)

## Repository

https://github.com/vikvikvr/taipo.git

## One liner

A **typing game** that takes your mistakes to the next level.

## Project description

### Idea 💡

Get a **sentence**, type it as fast as you can.
Look out for the **typos**, some letters will be replaced by random ones!
Mistakes will prevent you from continuing for a brief amount of time, impacting your overall time.

### Game modes 🕹

Try it out as a **guest**, just practice your skills without worrying about competition.

Feeling lucky? Sign In and join a **random opponent** for a 1 vs. 1 match. You will see in real time the progress of the other player.

Want to challenge someone specific? Get the code and share it **with a friend** so you can play together.

### Misc ❓

Review your progress by taking a look at the **history of your matches**.
You will also be given useful **stats** so you can compare yourself against your friends.

## MVP

Users should be able to **play alone and together**. The game should provide accurate feedback about letters typed correctly and mistakes made, by both players, in real time.

## Tech stack

This is going to be a desktop-only full stack app: a physical keyboard makes it for a more enjoyable experience).

**Front End:**

- **Typescript**: safety first 💙
- **React**: got me... hooked! ⚛
- **Sass**: mixin' those styles 🎨
- **Rxjs**: what is prop drilling anyway? 🐈
- **socket.io**: no choice there 🎮
- **howler.js**: the monkey logo is just awesome 🎧
- **gsap**: never gonna write @keyframes ever again 🦸‍♂️

**Back End:**

- **Typescript**: safety first 💙
- **Express**: middlewares, middlewares everywhere 🌐
- **socket.io**: no choice there 🎮
- **mongoose**: SQL is scary! just kidding (?) 🐀

## Data sources

The **sentences** players are going to type could be of any type really: famous quotes, dictionary definitions, random pieces of text. I am prbably going to decide on the data source as one of the last things, get the sentences all at once and hardcode them in the database. The insertion of typos will happen dinamically instead, upon game creation.
