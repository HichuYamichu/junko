# Junko

#### ~~shameless rip off but it's pretty cool~~

## What is this?

This repo contains my Discord bot, as well as it's api and a dashboard. It's not meant to be top tier production ready stuff, but rather a platform, on which I can implement/try/learn whatever I feel like.

## BOT

Made with Discord.js/Akairo. Doesn't have all that may commands and doesn't provide much functionality either, but it uses gRPC to communicate with other services, exposes metrics for Promethes and has some cool ideas here and there (like modular responce system).

## API

Written in Go works as Graphql interface for gRPC connection between BOT and API itself. Propably one of the best parts about this project. Implementing Graphql on top of gRPC is really fun and satisfying <s>especialy when it finnally works and everything starts to make sence.</s>

## Dashboard

Made with Nuxt.js displays some data fetched from Discord client. It's not all that good <s> sorry Im not a frontend dev </s> but there are some cool things about it too, like the fact that it doesn't use vuex, instead all of the state managment is done by Apollo Graphql client.

## Running the bot

make sure to rename .env.example to .env and provide required stuff

```bash
# with docker:
docker-compose up

# without docker:
¯\_(ツ)_/¯
# you need build tools for sure also Go modules can come in handy
```