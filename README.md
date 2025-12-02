<p align="center"><img src="https://media1.tenor.com/m/HsA7Tx83EskAAAAC/miyuki-takara-lucky-star.gif"></p>

<h1 align="center">Miyuki</h1>

Free and Open-source silly opinionated uptime monitor & status page with zero to none slop.

## Features

- [ ] Status page / Uptime monitor
- [ ] Alerts
- [ ] Maintenance
- [ ] Incidents

### Supported methods

- [ ] HTTP
- [ ] HTTPS
- [ ] WebSocket
- [ ] gRPC
- [ ] socket.io

## Screenshots

<img src="https://uwu.so/eemxA1ZqQki">

## Setup

For the ease of deployment <b>Miyuki</b> uses Docker. Be sure it's installed on your machine with compose plugin.

### Production

1. Clone the repository

`git clone git@github.com:LMNYX/miyuki.git && cd miyuki`

2. Build and run the image

`docker compose up -d`

### Development

1. Clone the repository

`git clone git@github.com:LMNYX/miyuki.git && cd miyuki`

2. Build and run the development image with HMR

`docker-compose -f docker-compose.dev.yml up`
