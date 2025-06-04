import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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

  it('GET / should return dashboard data`', async () => {
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
});
