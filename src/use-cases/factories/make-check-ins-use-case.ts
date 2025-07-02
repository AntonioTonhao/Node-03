import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository';
import { CheckInsUseCase } from '../@check-ins/check-ins';

export default function makeCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymInsRepository = new PrismaGymsRepository();
  const useCase = new CheckInsUseCase(checkInsRepository, gymInsRepository);

  return useCase;
}
