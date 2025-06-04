<h1 align="center">Farm NestJS API</h1>

## Introduction

- A simple project creating a CRUD REST API to manage farms

## Technologies

- [NodeJS](https://nodejs.org/en)
- [NestJS](https://nestjs.com/)
- [PrismaORM](https://www.prisma.io/)
- [Docker](https://docs.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Development Setup Local

1. Clone repository

```bash
git clone git@github.com:AlexGalhardo/farm-nestjs-api.git
```

2. Enter repository

```bash
cd farm-nestjs-api/
```

3. Install dependencies

```bash
npm install
```

4. Setup your environment variables

```bash
cp .env.example .env
```

5. Create Migrations and Seeds

```bash
chmod +x setup.sh && ./setup.sh
```

6. Start local server

```bash
npm run dev
```

## Prisma Studio (DataBase GUI)

- To Start Prisma Studio:

```bash
npm run prisma:studio
```

## Build

a. Creating build

```bash
npm run build
```

b. Testing build server locally

```bash
npm run start
```

## Tests

a. Run all unit mocked tests

```bash
npm run test
```

b. Run all end to end tests

```bash
npm run test:e2e
```

## API Requests

- You can see the HTTP Requests references inside folder [rest-client/](rest-client/)
- You can also see  API documentation in: <http://localhost:3000/docs>

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) June 2025-present, [Alex Galhardo](https://github.com/AlexGalhardo)
