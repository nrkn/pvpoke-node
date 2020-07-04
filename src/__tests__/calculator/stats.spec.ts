import { getCpFromLevel } from '../../calculator/stats'

describe('getCpFromLevel', () => {
  it('returns the correct CP', () => {
    const cp =  getCpFromLevel(
      { atk: 300, def: 182, hp: 214 },
      { atk: 15, def: 12, hp: 15 },
      40
    )

    expect(cp).toEqual(4146)
  })
})
