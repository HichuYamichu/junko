FROM node:12-alpine

WORKDIR /usr/src/junko

COPY package.json package-lock.json tsconfig.json /usr/src/junko/

RUN apk add --no-cache --virtual build-deps \
    python g++ build-base cairo-dev jpeg-dev pango-dev musl-dev \
    giflib-dev pixman-dev pangomm-dev libjpeg-turbo-dev freetype-dev \
    && npm install \
    && apk del build-deps \
    && apk add --no-cache \
    cairo jpeg pango musl giflib pixman pangomm libjpeg-turbo \
    freetype libmount ttf-dejavu ttf-droid ttf-freefont ttf-liberation \
    ttf-ubuntu-font-family fontconfig


COPY . /usr/src/junko/

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]