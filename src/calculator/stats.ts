import { Stats } from '../entities/pokedex/types'

export const getCpm = ( level: number ) => {
  const memoized = levelToCpmMap.get( level )

  if( memoized ) return memoized

  const cpm = (
    level % 1 === 0 ?
    cpms[ level - 1 ] :
    Math.sqrt(
      (
        Math.pow( cpms[ Math.floor( level - 1 ) ], 2 ) +
        Math.pow( cpms[ Math.ceil( level - 1 ) ], 2 )
      ) / 2
    )
  )

  levelToCpmMap.set( level, cpm )

  return cpm
}

const levelToCpmMap = new Map<number,number>()

export const getCalculatedStats = (
  baseStats: Stats, ivs: Stats, level: number
): Stats => {
  const cpm = getCpm( level )

  const atk = cpm * ( baseStats.atk + ivs.atk )
  const def = cpm * ( baseStats.def + ivs.def )
  const hp = Math.max( Math.floor( cpm * ( baseStats.hp + ivs.hp ) ), 10 )

  return { atk, def, hp }
}

export const getCpFromLevel = ( baseStats: Stats, ivs: Stats, level: number ) =>
  getCp( baseStats, ivs, getCpm( level ) )

export const getCp = ( baseStats: Stats, ivs: Stats, cpm: number ) => {
  const cp = Math.floor(
    (
      ( baseStats.atk + ivs.atk ) *
      Math.pow( baseStats.def + ivs.def, 0.5 ) *
      Math.pow( baseStats.hp + ivs.hp, 0.5 ) *
      Math.pow( cpm, 2 )
    ) / 10
  )

  return Math.max( cp, 10 )
}

const cpms: readonly number[] = [
  0.093999997, 0.16639787, 0.21573247, 0.25572005, 0.29024988,
  0.3210876, 0.34921268, 0.37523559, 0.39956728, 0.42250001,
  0.44310755, 0.46279839, 0.48168495, 0.49985844, 0.51739395,
  0.53435433, 0.55079269, 0.56675452, 0.58227891, 0.59740001,
  0.61215729, 0.62656713, 0.64065295, 0.65443563, 0.667934,
  0.68116492, 0.69414365, 0.70688421, 0.71939909, 0.7317,
  0.73776948, 0.74378943, 0.74976104, 0.75568551, 0.76156384,
  0.76739717, 0.7731865, 0.77893275, 0.78463697, 0.79030001,
  0.79530001, 0.8003, 0.8053, 0.81029999, 0.81529999
]
