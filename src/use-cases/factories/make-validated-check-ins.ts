import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { ValidadeCheckInsUseCase } from '../@check-ins/validated-check-in';

export default function makeValidatedCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidadeCheckInsUseCase(checkInsRepository);

  return useCase;
}
