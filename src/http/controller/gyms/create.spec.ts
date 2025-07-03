import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticate(app);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Test',
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: '123456789',
        title: 'Gym Test',
      });

    expect(response.statusCode).toEqual(201);
  });
});
