# server-projector-control
Node.js server built with NestJS for controlling a projector via RS232. Enables simple on/off functionality and status control.

## Version
Node v18.16.0
yarn 1.22.19

# Projector Control with NestJS

Node.js server built with NestJS for controlling a projector via RS232. Enables simple on/off functionality and status control.
1. EPSON Projector - EB-L730G, EB-L720U
2. LG ProBeam -
3. Panasonic - PT-VMZ61

## Features
- 🎥 RS232 control for projector on/off
- 🔧 Easily manage the projector's state
- ⚙️ Powered by NestJS for a scalable and efficient server-side application

## Running the app

```bash
# development
$ npm run start or yarn start

# watch mode
$ npm run start:dev or yarn start:dev

# production mode
$ npm run start:prod or yarn start:prod

$ http://localhost:3000/


```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```