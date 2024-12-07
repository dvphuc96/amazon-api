## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Technology

```bash
### Install prisma
$ yarn add prisma @prisma/client
$ yarn prisma init
$ yarn prisma db pull --schema src/prisma/schema.prisma
$ yarn prisma generate --schema src/prisma/schema.prisma

### Install prisma service
$ nest g service prisma --no-spec
$ nest g module prisma --no-spec
Step 2: https://docs.nestjs.com/recipes/prisma#set-up-prisma

### Config
$ yarn add @nestjs/config

### Install swagger
$ yarn add @nestjs/swagger swagger-ui-express
$ yarn add class-validator class-transformer

### Install jwt
$ nest g resource auth --no-spec
$ yarn add @nestjs/jwt
$ yarn add jsonwebtoken

### Install bcrypt
$ yarn add bcrypt

### Install typeorm

```
