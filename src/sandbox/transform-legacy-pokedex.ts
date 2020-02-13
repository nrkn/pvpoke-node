import * as legacyPokedex from './data/pvpoke-pokedex.json'

import { PokedexEntry, SpeciesTypes } from '../entities/pokedex/types'

const entries: PokedexEntry[] = []

legacyPokedex.forEach( p => {
  const {
    dex, speciesName, speciesId, baseStats, types, fastMoves, chargedMoves,
    legacyMoves, shadow, tags
  } = p

  const entry: PokedexEntry = {
    dex, speciesName, speciesId, baseStats, types: types as SpeciesTypes,
    fastMoves, chargedMoves, legacyMoves: legacyMoves || [], tags: tags || []
  }

  if( shadow ) entry.tags.push( 'shadow' )

  entries.push( entry )
})

console.log( JSON.stringify( entries, null, 2 ) )
