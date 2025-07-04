import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from './get-users-metrics';

let checkInsRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should to get user fetch user history check-ins', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});
