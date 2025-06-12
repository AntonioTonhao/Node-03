import { expect, describe, it, beforeEach } from 'vitest'
import { FetchUserCheckInHistory } from './fetch-user-check-in-history'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInHistory

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInHistory(checkInsRepository)
  })

  it('should to get user fetch user history check-ins', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to fetch 20 items for page', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
