## Description

Blogwiser is a blog management system with NestJS (ExpressJS, MongoDB).

## Installation

```bash
 npm install
```

Rename the `sample.env` file to `.env` and initialize the variables with proper values.

## Running MongoDB and Redis in Docker

```bash
# Only for linux
echo "vm.overcommit_memory = 1" | sudo tee -a /etc/sysctl.conf && mkdir redis_data && sudo chown -R 1001:1001 ./redis_data

# Normal mode
docker compose up

# Background mode
docker compose up -d
```

## Running the app

```bash
# development
 npm run start

# watch mode
 npm run start:dev

# production mode
 npm run start:prod
```

## Test

```bash
# unit tests
 npm run test

# e2e tests
 npm run test:e2e

# test coverage
 npm run test:cov
```
