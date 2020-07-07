import { sliceUpstreamGamemaster } from './slice-upstream-gamemaster'
import { transformPvpokePokedexEntry } from './transform-pvpoke-pokedex-entry'
import { transformPvpokeMove } from './transform-pvpoke-move'
import { writeObjAsJson } from './util'

export const buildDataFromUpstream = async () => {
  const { 
    pokemon: pvpokePokemon, 
    moves: pvpokeMoves 
  } = await sliceUpstreamGamemaster()

  await writeObjAsJson( 
    './src/sandbox/data/pvpoke-pokedex.json', pvpokePokemon 
  )
  await writeObjAsJson( './src/sandbox/data/pvpoke-moves.json', pvpokeMoves )

  const pokedex = await Promise.all( 
    pvpokePokemon.map( transformPvpokePokedexEntry ) 
  )

  const moves = await Promise.all(
    pvpokeMoves.map( transformPvpokeMove )
  )

  await writeObjAsJson( './src/data/pokedex.json', pokedex )
  await writeObjAsJson( './src/data/moves.json', moves )
}

if( !module.parent ) buildDataFromUpstream()
