import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createAndAuthenticate } from '@/utils/test/create-and-authenticate';

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gym', async () => {
    const { token } = await createAndAuthenticate(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Test',
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: '123456789',
        title: 'Gym Type',
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Test',
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: '123456789',
        title: 'Gym Java',
      });

    const gymsResponse = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Gym Type',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(gymsResponse.statusCode).toEqual(200);
    expect(gymsResponse.body.gyms).toHaveLength(1);
    expect(gymsResponse.body.gyms).toEqual([
      expect.objectContaining({ title: 'Gym Type' }),
    ]);
  });

  it('should be able to fetch 20 items for page', async () => {
    const { token } = await createAndAuthenticate(app);

    for (let i = 1; i <= 22; i++) {
      await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'Test',
          latitude: -27.2092052,
          longitude: -49.6401091,
          phone: '123456789',
          title: `Gym java ${i}`,
        });
    }

    const gymsResponse = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Gym Java',
        page: 2,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(gymsResponse.statusCode).toEqual(200);
    expect(gymsResponse).toHaveLength(2);
    expect(gymsResponse).toEqual([
      expect.objectContaining({ title: 'Gym java 21' }),
      expect.objectContaining({ title: 'Gym java 22' }),
    ]);
  });
});
