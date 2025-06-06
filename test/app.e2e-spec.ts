import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/domain/dashboard/app.module';
import { cpf } from 'cpf-cnpj-validator'; 

interface DashboardAllResponse {
  totalProducers: number;
  totalFarms: number;
  totalCrops: number;
  totalArableArea: number;
  totalVegetationArea: number;
  totalArea: number;
  totalArablePercentage: number;
  totalVegetationPercentage: number;
  producersByState: Array<{ state: string; farmCount: number }>;
  producersByCity: Array<{ city: string; farmCount: number }>;
  allCrops: Array<{ name: string; count: number }>;
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdProducerId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    if (createdProducerId) {
      await request(app.getHttpServer())
        .delete(`/producers/${createdProducerId}`)
        .catch(() => {});
    }

    createdProducerId = '';
  });

  it('GET / should return dashboard data', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);

    const body = response.body?.data?.all as DashboardAllResponse;

    expect(body).toHaveProperty('totalProducers');
    expect(body).toHaveProperty('totalFarms');
    expect(body).toHaveProperty('totalCrops');
    expect(body).toHaveProperty('totalArableArea');
    expect(body).toHaveProperty('totalVegetationArea');
    expect(body).toHaveProperty('totalArea');
    expect(body).toHaveProperty('totalArablePercentage');
    expect(body).toHaveProperty('totalVegetationPercentage');
    expect(body).toHaveProperty('producersByState');
    expect(body).toHaveProperty('producersByCity');
    expect(body).toHaveProperty('allCrops');

    expect(typeof body.totalProducers).toBe('number');
    expect(typeof body.totalFarms).toBe('number');
    expect(Array.isArray(body.producersByState)).toBe(true);
    expect(Array.isArray(body.producersByCity)).toBe(true);
    expect(Array.isArray(body.allCrops)).toBe(true);
  });

  it('POST /producers should create a new producer', async () => {
    const producerData = {
      name: "TEST_Alex Galhardo",
      cpfCnpj: cpf.generate()
    };

    const response = await request(app.getHttpServer())
      .post('/producers')
      .send(producerData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe(producerData.name);
    expect(response.body.data.cpfCnpj).toBe(producerData.cpfCnpj);
    expect(response.body.data).toHaveProperty('createdAt');
    expect(response.body.data).toHaveProperty('updatedAt');
    expect(response.body.data.deletedAt).toBeNull();

    createdProducerId = response.body.data.id;
  });

  it('POST /farms should create a new farm', async () => {
    const producerData = {
      name: "TEST_Producer for Farm",
      cpfCnpj: cpf.generate()
    };

    const producerResponse = await request(app.getHttpServer())
      .post('/producers')
      .send(producerData)
      .expect(201);

    createdProducerId = producerResponse.body.data.id;

    const farmData = {
      producerId: createdProducerId,
      name: "TEST_Fazendinha 2",
      city: "Araçatuba",
      state: "São Paulo",
      totalArea: 100,
      vegetationArea: 30,
      agriculturalArea: 70
    };

    const response = await request(app.getHttpServer())
      .post('/farms')
      .send(farmData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.producerId).toBe(createdProducerId);
    expect(response.body.data.name).toBe(farmData.name);
    expect(response.body.data.city).toBe(farmData.city);
    expect(response.body.data.state).toBe(farmData.state);
    expect(response.body.data.totalArea).toBe(farmData.totalArea);
    expect(response.body.data.vegetationArea).toBe(farmData.vegetationArea);
    expect(response.body.data.agriculturalArea).toBe(farmData.agriculturalArea);
  });

  it('POST /harvests should create a new harvest', async () => {
    const producerData = {
      name: "TEST_Producer for Harvest",
      cpfCnpj: cpf.generate()
    };

    const producerResponse = await request(app.getHttpServer())
      .post('/producers')
      .send(producerData)
      .expect(201);

    createdProducerId = producerResponse.body.data.id;

    const farmData = {
      producerId: createdProducerId,
      name: "TEST_Farm for Harvest",
      city: "Araçatuba",
      state: "São Paulo",
      totalArea: 100,
      vegetationArea: 30,
      agriculturalArea: 70
    };

    const farmResponse = await request(app.getHttpServer())
      .post('/farms')
      .send(farmData)
      .expect(201);

    const createdFarmId = farmResponse.body.data.id;

    const harvestData = {
      farmId: createdFarmId,
      year: 2025
    };

    const response = await request(app.getHttpServer())
      .post('/harvests')
      .send(harvestData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.farmId).toBe(createdFarmId);
    expect(response.body.data.year).toBe(harvestData.year);
  });

  it('POST /crops should create a new crop', async () => {
    const producerData = {
      name: "TEST_Producer for Crop",
      cpfCnpj: cpf.generate()
    };

    const producerResponse = await request(app.getHttpServer())
      .post('/producers')
      .send(producerData)
      .expect(201);

    createdProducerId = producerResponse.body.data.id;

    const farmData = {
      producerId: createdProducerId,
      name: "TEST_Farm for Crop",
      city: "Araçatuba",
      state: "São Paulo",
      totalArea: 100,
      vegetationArea: 30,
      agriculturalArea: 70
    };

    const farmResponse = await request(app.getHttpServer())
      .post('/farms')
      .send(farmData)
      .expect(201);

    const createdFarmId = farmResponse.body.data.id;

    const harvestData = {
      farmId: createdFarmId,
      year: 2025
    };

    const harvestResponse = await request(app.getHttpServer())
      .post('/harvests')
      .send(harvestData)
      .expect(201);

    const createdHarvestId = harvestResponse.body.data.id;

    const cropData = {
      farmId: createdFarmId,
      harvestId: createdHarvestId,
      name: "TEST_Soja",
      useArableArea: 10
    };

    const response = await request(app.getHttpServer())
      .post('/crops')
      .send(cropData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.harvestId).toBe(createdHarvestId);
    expect(response.body.data.name).toBe(cropData.name);
    expect(response.body.data.useArableArea).toBe(cropData.useArableArea);
  });
});