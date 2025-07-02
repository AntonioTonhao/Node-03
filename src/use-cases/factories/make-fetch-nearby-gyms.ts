import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository';
import { FetchNearbyGymsUseCase } from '../@gyms/fetch-nearby-gyms';

export default function makeFetchNearbyGymsUseCase() {
  const gymInsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymInsRepository);

  return useCase;
}
