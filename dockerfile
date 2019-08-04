FROM node:10-alpine

WORKDIR /usr/src/junko

COPY package.json yarn.lock ./

RUN apk add --update \
&& apk add --no-cache pixman cairo pango giflib libjpeg-turbo \
&& apk add --no-cache --virtual .build-deps git curl build-base jpeg-dev pixman-dev \
cairo-dev pango-dev pangomm-dev libjpeg-turbo-dev giflib-dev freetype-dev python g++ make \
&& yarn install --build-from-source \
&& apk del .build-deps

COPY . .

ENV TOKEN= \
YT_KEY= \
SPOTIFY_ID= \
SPOTIFY_SECRET= \
OWNER_ID= \
REDIS_URI= 
CMD yarn start