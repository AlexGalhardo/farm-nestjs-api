<h1 align="center"><a href="https://farm-nestjs-api.alexgalhardo.com" target="_blank">farm-nestjs-api.alexgalhardo.com</a></h1>

## Data in the live endpoint is deleted every 10 minutes

<img width="868" alt="Screenshot 2025-06-06 at 16 23 33" src="https://github.com/user-attachments/assets/442f0ba0-d6d9-4e26-b0c1-1c11268ef358" />

<img width="585" alt="Screenshot 2025-06-06 at 16 23 51" src="https://github.com/user-attachments/assets/29a73be5-d846-4514-8d3e-fbf27a44158e" />

## Objectives and Bussiness Rules

Manage the registration of rural producers with the following data:

- CPF or CNPJ (Brazilian individual or company taxpayer number)  
- Producer's name  
- Farm (property) name  
- City  
- State  
- Total farm area (in hectares)  
- Arable area (in hectares)  
- Vegetation area (in hectares)  
- Harvests (e.g., Harvest 2021, Harvest 2022)  
- Planted crops (e.g., Soybean in Harvest 2021, Corn in Harvest 2021, Coffee in Harvest 2022)

### **Business Requirements**

1. Allow the creation, editing, and deletion of rural producers.  
2. Validate the CPF or CNPJ provided by the user.  
3. Ensure that the sum of the arable area and vegetation area does not exceed the total farm area.  
4. Allow the registration of multiple crops per producer's farm.  
5. A producer can be associated with 0, 1, or more rural properties.  
6. A rural property can have 0, 1, or more crops planted per harvest.  
7. Display a dashboard with:
   - Total number of registered farms.  
   - Total registered area (in hectares).  
   - Pie charts:
     - By state.  
     - By planted crop.  
     - By land use (arable area and vegetation).

## Technologies

- [NodeJS](https://nodejs.org/en)
- [NestJS](https://nestjs.com/)
- [PrismaORM](https://www.prisma.io/)
- [Docker](https://docs.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Development Setup using Docker

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

5. Start Docker Postgres and build and up Docker Api Service

```bash
sudo chmod +x setup.sh && ./setup.sh
```

6. The Server API will start Inside docker connecting to your local machine at: <http://localhost:3000>

## Development Setup Localhost

- After step 4 previously, comment `api` service in `docker-compose.yaml`
- Setup in your `.env` the value: `DATABASE_URL="postgres://postgres:postgres@localhost:5432/farm_nestjs_api?schema=public"`
- Run: `sudo docker-compose up` to up Postgres only
- Run: `npm run prisma:migrate` to create migrations
- If you wanna seed database, run: `npm run prisma:db:seed`
- Start Server locally: `npm run dev`
- Go to: <http://localhost:3000>

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
