import { getPokedexEntryById } from '../entities/pokedex'
import { getCpFromLevel } from '../calculator/stats'

const mewtwoDex = getPokedexEntryById( 'mewtwo' )!

const cp = getCpFromLevel(
  mewtwoDex.baseStats, { atk: 15, def: 12, hp: 15 }, 40
)

console.log( cp )
