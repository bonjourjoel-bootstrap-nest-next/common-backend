// src/health/health.controller.spec.ts

import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { HTTP } from 'src/lib/enums/http-status-code.enum';
import { HealthController } from './health.controller';
import { INestApplication } from '@nestjs/common';

/**
 * =======================================================
 * Test Suite: HealthController
 * =======================================================
 */
describe('Integration Test: HealthController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Setup the testing module with the HealthController
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    // Initialize the Nest application
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // Gracefully close the app after the tests
    await app.close();
  });

  /**
   * =======================================================
   * Test Suite: GET /health - Health Check Endpoint
   * =======================================================
   */
  describe('/health (GET) - Health Check Endpoint', () => {
    // Test: Should return 200 OK with status 'OK'
    it('/health (GET) should return 200 and status OK', async () => {
      await request(app.getHttpServer())
        .get('/health') // Endpoint to test
        .expect(HTTP._200_OK) // Expecting a 200 OK status
        .expect({ status: 'OK' }); // Expecting response body
    });
  });
});
