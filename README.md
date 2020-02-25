# ClothStore

> Shop application

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Clone](#clone)
- [Setup](#setup)
- [Features](#features)
- [Contact](#contact)

## General info

Full-stack application which is internet cloth store.

## Technologies

- HTML5
- CSS3
- React
- Redux
- Node.js
- Express.js
- MongoDB

## Clone

- Clone this repo to your local machine using https://github.com/dantox71/ClothStore.git

- Rename config.

## Setup

First, You have to change <b>config.env.env</b> filename to be <b>config.env</b> & fill it with Your own data.

Next, install dependencies:

```bash
 npm install
 cd client npm install
```

And finally you can run development environment:

```bash
 npm run dev
```

## Problems

- Uploading photo doesn't work in deployed application because it's deployed to heroku which doesn't support uploading.
- When User deleted His account and was logged in on other device then it doesn't log his out from that device. It causes bug because there's token in His browser's localStorage which try to load user that doesn't exist anymore

## Live

Here you can find my application : [@SocialNetwork](http://clothstoree.herokuapp.com)

## Contact

Created by [@Daniel Łagowski](https://daniellagowski.netlify.com/) - feel free to contact me!
