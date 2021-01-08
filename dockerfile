FROM node:12-alpine

ENV TOKEN= \
YT_KEY= \
SPOTIFY_ID= \
SPOTIFY_SECRET= \
OWNER_ID= \
REDIS_URI= \
RPC_ADDR=

WORKDIR /usr/src/junko

COPY src/bot/package.json src/bot/pnpm-lock.yaml src/bot/tsconfig.json /usr/src/junko/

RUN apk add --update \
&& apk add --no-cache pixman cairo pango giflib libjpeg-turbo \
&& apk add --no-cache --virtual .build-deps git curl build-base jpeg-dev pixman-dev \
cairo-dev pango-dev pangomm-dev libjpeg-turbo-dev giflib-dev freetype-dev python g++ make \
&& curl -L https://unpkg.com/@pnpm/self-installer | node \
&& pnpm install \
&& apk del .build-deps

COPY src/bot /usr/src/junko/

RUN pnpm run build

EXPOSE 5000

CMD ["pnpm", "run", "start"]