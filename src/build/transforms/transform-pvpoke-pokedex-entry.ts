import { PokedexEntry } from '../entities/pokedex/types'

export const transformPvpokePokedexEntry = ( d: any ) => {
  const {
    dex, speciesName, speciesId, baseStats, types, fastMoves, chargedMoves,
    eliteMoves, tags
  } = d

  const entry: PokedexEntry = {
    dex, speciesName, speciesId, baseStats, types, fastMoves, chargedMoves, 
    eliteMoves: eliteMoves || [], tags: tags || []
  }

  return entry
}
