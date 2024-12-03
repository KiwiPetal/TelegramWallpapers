# Telegram Wallpaper maker

A telegram bot written with [Telegraf.js](https://telegraf.js.org) that turns any image sent into a fitted phone wallpaper with a blurry background.

The project uses [Docker](https://www.docker.com), to make the setup easier.

![Telegram Wallpaper Bot screenshot](https://i.imgur.com/Yy6PEGD.png)

## Table of Contents

- [File Structure](#file-structure)
- [Requirements](#requirements)
- [Setup](#setup)
    - [Using Docker](#using-docker)
    - [Manual](#manual)
- [Usage](#usage)

## File Structure
```bash
.
├── Dockerfile
└── src
    ├── bot.ts
    ├── index.ts
    ├── handlers
    │   └── index.ts
    ├── models
    │   ├── bot.ts
    │   └── functions.ts
    └── utilities
        ├── functions.ts
        └── validateEnv.ts
```

## Requirements 

- [Docker](https://www.docker.com)

or if you are planning to run the script yourself

- [NodeJS](https://nodejs.org/en) >= v18.0.5

## Setup

### Using Docker

1. Create a token for the bot through [BotFather](https://t.me/BotFather)

2. Get the docker image:
```bash
docker pull kiwipetal/telegramwallpapers:latest
```

3. Run the docker image:
```bash
docker run -d -e BOT_TOKEN="YOURTOKEN" kiwipetal/telegramwallpapers:latest
```

### Manual

1. Pull the repository.

2. Install all dependencies:
```bash
npm install
# or
yarn
```

3. Create a token for the bot through [BotFather](https://t.me/BotFather)

4. Create an .env file:
```env
BOT_TOKEN=YOURTOKEN
```

5. Run the script
```bash
npm run start
# or
yarn start
```

## Usage

Send a number to change the blur strength (default: 200). The package for blurring seems to break if you go above 300 though (Will fix that later).

Send an image (not as a file). The bot will respond with an edited version.

## TODOs

- [x] Script to Make images
- [x] Custom intensity
- [x] Docker integration
- [ ] Feature flag to opt out of session persistence
- [ ] Custom resolution
- [ ] Shadow
- [ ] Colour instead of blur
