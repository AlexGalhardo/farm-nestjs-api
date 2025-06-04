import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

interface DashboardResponse {
  totalProducers: number;
  totalFarms: number;
  totalCrops: number;
  totalArableArea: number;
  totalVegetationArea: number;
  totalArea: number;
  arablePercentage: number;
  vegetationPercentage: number;
  producersByState: Array<{ state: string; count: number }>;
  producersByCity: Array<{ city: string; count: number }>;
  mostCommonCrops: Array<{ name: string; season: string; count: number }>;
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

  it('GET / should return dashboard data', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer()).get('/').expect(200);

    const body = response.body as DashboardResponse;

    expect(body).toHaveProperty('totalProducers');
    expect(body).toHaveProperty('totalFarms');
    expect(body).toHaveProperty('totalCrops');
    expect(body).toHaveProperty('totalArableArea');
    expect(body).toHaveProperty('totalVegetationArea');
    expect(body).toHaveProperty('totalArea');
    expect(body).toHaveProperty('arablePercentage');
    expect(body).toHaveProperty('vegetationPercentage');
    expect(body).toHaveProperty('producersByState');
    expect(body).toHaveProperty('producersByCity');
    expect(body).toHaveProperty('mostCommonCrops');

    expect(typeof body.totalProducers).toBe('number');
    expect(typeof body.totalFarms).toBe('number');
    expect(Array.isArray(body.producersByState)).toBe(true);
    expect(Array.isArray(body.producersByCity)).toBe(true);
    expect(Array.isArray(body.mostCommonCrops)).toBe(true);
  });
});
