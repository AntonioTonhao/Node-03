import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate';

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to fetch nearby gym', async () => {
    const { token } = await createAndAuthenticate(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Test',
        latitude: -20.2646072,
        longitude: -42.0315136,
        phone: '123456789',
        title: 'Gym Type',
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Test',
        latitude: -20.2230827,
        longitude: -41.7256393,
        phone: '123456789',
        title: 'Gym Java',
      });

    const gymsResponse = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.2646072,
        longitude: -42.0315136,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(gymsResponse.statusCode).toEqual(200);
    expect(gymsResponse.body.gyms).toHaveLength(1);
    expect(gymsResponse.body.gyms).toEqual([
      expect.objectContaining({ title: 'Gym Type' }),
    ]);
  });
});
