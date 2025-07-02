import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AutenticateUseCase } from '../@users/autentication';

export default function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new AutenticateUseCase(usersRepository);

  return useCase;
}
