import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './check-ins'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInsUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInsUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should to register', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 3, 0, 0))

    await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
    })

    await expect(() =>
      sut.execute({
        gymId: 'Gym Test',
        userId: 'User Test',
      }),
    ).rejects.instanceOf(Error)
  })
  it('should be able to check in twice in the different days ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 3, 0, 0))

    await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 3, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'Gym Test',
      userId: 'User Test',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
