<h1 align="center"><a href="https://farm-nestjs-api.alexgalhardo.com" target="_blank">farm-nestjs-api.alexgalhardo.com</a></h1>

<https://github.com/user-attachments/assets/b6115a84-9af7-4400-b537-11df931a126c>

## Technologies

- [NodeJS v22](https://nodejs.org/en)
- [NestJS v11](https://nestjs.com/)
- [PrismaORM](https://www.prisma.io/)
- [Docker](https://docs.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Prerequisites

- Node v22 and NPM v11

```bash
nvm install 22.9.0
nvm use 22.9.0
npm install -g npm@11.4.2
```

## Local Development Setup using Docker

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

5. UP Docker with Postgres & API

```bash
sudo chmod +x setup.sh && ./setup.sh
```

6. The Server API will start Inside docker connecting to your local machine at: <http://localhost:3000>

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

## API Requests and Docs

- You can see and use the HTTP Requests references inside folder [rest-client/](rest-client/)
- OpenAPI Documentation (using Swagger)
  - Local: <http://localhost:3000/api-docs>
  - Live API-DOCS: <https://farm-nestjs-api.alexgalhardo.com/api-docs>

## Tests

a. Run all unit mocked tests

```bash
npm run test
```

<img width="924" alt="Screenshot 2025-06-06 at 16 24 05" src="https://github.com/user-attachments/assets/ac1fae3d-785c-4c0d-a251-c2e090db626a" />

b. Run all end to end tests

```bash
npm run test:e2e
```

<img width="930" alt="Screenshot 2025-06-06 at 14 43 15" src="https://github.com/user-attachments/assets/a1510f34-6f70-4896-9123-e02267c4f4c0" />

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) June 2025-present, [Alex Galhardo](https://github.com/AlexGalhardo)
