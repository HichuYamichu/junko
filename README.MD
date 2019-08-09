# Junko

#### ~~shameless rip off but it's pretty cool~~

## Bot

Bot includes a few utility/fun commands and a pretty decent random response system.

## Dashboard

Dashboard includes bunch of statistics, logs and some settings of the bot.

## How

The bot itself is made with `discord-akairo` an excellent `discord.js` framework. Dashboard is made with `Nuxt.js` mainly because I like working with `Vue.js` <s>not that I know any other frontend framework</s> and because it's custom server feature was just what I needed. Bot and dashboard communicate using `gRPC` because it's extremely fast, efficient and is meant to be used for service communication.

## Running the bot localy

```bash
# with docker:
docker-compose up

# without docker:
# ¯\_(ツ)_/¯
# you need build tools for sure and maybe protoc
```