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
sudo chmod +x setup.sh && ./setup.sh
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

## API Requests and Docs

- You can see and use the HTTP Requests references inside folder [rest-client/](rest-client/)
- OpenAPI Documentation (using Swagger)
   - You can also see  API documentation in: <http://localhost:3000/api-docs>

### Example

```
1. Create producer first

POST http://localhost:3000/producers
content-type: application/json

body
{
 "name": "Alex Galhardo",
 "cpfCnpj": "24821612666"
}

2. Create farm next using producer id created previously

POST http://localhost:3000/farms
content-type: application/json

body
{
 "producerId": "80f481c5-c52c-4c11-abe8-f2e777335924",
 "name": "Fazendinha 2",
 "city": "Araçatuba",
 "state": "São Paulo",
 "totalArea": 100,
 "vegetationArea": 30,
 "agriculturalArea": 70
}

3. Create harvest connected to farm id created previously

POST http://localhost:3000/harvests
content-type: application/json

body
{
 "farmId": "a58c3e00-7276-4eb2-886d-c6ad4f0dbd99",
 "year": 2025
}

4. Last, create crop connected to farm and harvest id created previously 

POST http://localhost:3000/crops
content-type: application/json

body
{
 "farmId": "a58c3e00-7276-4eb2-886d-c6ad4f0dbd99",
 "harvestId": "b65a0694-9878-45d0-894b-5d62047256fe",
 "name": "Soja",
 "useArableArea": 10
}
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

<img width="930" alt="Screenshot 2025-06-06 at 14 25 07" src="https://github.com/user-attachments/assets/a68c9e62-ee3c-4340-a649-1deb14194a5a" />

<img width="924" alt="Screenshot 2025-06-06 at 14 25 22" src="https://github.com/user-attachments/assets/40ffbe88-f249-44db-a533-0602594d5bcc" />

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) June 2025-present, [Alex Galhardo](https://github.com/AlexGalhardo)
