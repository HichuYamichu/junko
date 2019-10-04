# Junko

#### ~~shameless rip off but it's pretty cool~~

## What is this?

This repo started as a simple discord bot and has grown significantly since then. Now it's more like a platform, on top of which I can try out and implement whatever cool thing I find. This project includes 3 core services: Bot, API and Dashboard powered by Postgres and Redis, as well as some amazing [cncf](https://www.cncf.io/) projects like Prometheus and Loki. Below is a quick round up of what does what and how. 

~~this is going to be more Touhou themed someday~~

## BOT

Made with Discord.js/Akairo. Doesn't have all that may commands and doesn't provide much functionality overall, but it uses gRPC to communicate with other services, exposes metrics for Promethes and has some cool ideas here and there. It doesn't focus on one thing rather its general purpose bot with some ~~worthless~~ fun commands.

## API

Written in Go works as Graphql interface for gRPC connection between BOT and API itself. Propably one of the best parts about this project. Implementing Graphql on top of gRPC is really fun and satisfying <s>especialy when it finnally works and everything starts to make sence.</s>

## Dashboard

Made with Nuxt.js. Just a regular info dashboard on the surface but it also has a admin panel with Discord client data and settings. It's not all that good <s> I'm quite bad at frontend </s> but there are some cool things about it too, like the fact that it doesn't use vuex, instead all of the state managment is done by Apollo Graphql client.

## Get your own

go to env directory, rename all .env.example files to .env and fill them with apropriate data

```bash
# with docker:
docker-compose up

# without docker:
¯\_(ツ)_/¯
# you need build tools for sure also Go modules can come in handy
```


# This is havely inspired by [yukikaze](https://github.com/Naval-Base/yukikaze) and [hoshi](https://github.com/1Computer1/hoshi). Credits to their owners for creating such amazing bots.