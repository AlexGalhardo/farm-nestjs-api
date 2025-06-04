<h1 align="center">Farm NestJS API</h1>

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

- You can see and use the HTTP Requests references inside folder [rest-client/](rest-client/)

## OpenAPI Documentation (using Swagger)

- You can also see  API documentation in: <http://localhost:3000/api-docs>

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) June 2025-present, [Alex Galhardo](https://github.com/AlexGalhardo)
