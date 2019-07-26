# Junko

### Requirements

Redis instance running under address specified in REDIS env variable
there should be hash named JunkoConf with following key value pairs

> token [discord bot token]

> YTkey [YouTube api key]

> prefix [glabal prefix for the bot]

> SpotifyID [spotify app ID]

> SpotifySecret [spotify app SpotifySecret]

> ownerID [self explanatory]

Running the bot itself:
```bash
  # with docker (preferred way)
  docker build -t junko .
  docker run --rm -d junko:latest

  # localy (requires node-gyp build tools)
  yarn
  yarn start
```