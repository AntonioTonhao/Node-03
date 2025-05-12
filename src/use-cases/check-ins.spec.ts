import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './check-ins'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInsUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInsUseCase(checkInRepository)
  })
  it('should to register', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
