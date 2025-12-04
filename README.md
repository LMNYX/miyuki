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

For **Miyuki** to work on your machine you need to have MongoDB and NodeJS pre-installed. To simplify deployment and upkeeping proccess use of Docker is recommended.

### Production

1. Clone the repository

`git clone git@github.com:LMNYX/miyuki.git && cd miyuki`

2. Build and run the image

`docker compose up -d`

3. After the container is up you can create a user, using a script:

`docker exec -it miyuki-web pnpm run create-user -- admin "Admin" password 99`

4. Go to `/dashboard` and use credentials you specified to login and configure the pages from there.

### Development

1. Clone the repository

`git clone git@github.com:LMNYX/miyuki.git && cd miyuki`

2. Build and run the development image with HMR

`docker compose -f docker-compose.dev.yml up --build --remove-orphans`

3. After the container is up you can create a user, using a script:

`docker exec -it miyuki-web-dev pnpm run create-user -- admin "Admin" password 99`

4. Go to `/dashboard` and use credentials you specified to login and configure the pages from there.