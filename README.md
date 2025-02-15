## Description

Backend part.
node v22

## Running application in docker

Create .env file in the root and copy .env.example to .env

Build docker containers

```
docker-compose build --no-cache
```

Run docker containers

```
docker-compose up
```

Create DB server in pgAdmin with credentials and values from .env file

Run DB migration in APPLICATION container terminal

```
npm run migration:run
```

Service docs
http://localhost:4000/doc

PgAdmin
http://localhost:5050/browser/

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Migrations

```bash
!!! to work with migrations locally you need to update .env file to localhost

# generate new migration
$ npm run migration:generate migrations/{{create-request-table}}

# run all pending migrations
$ npm run migration:run
```
