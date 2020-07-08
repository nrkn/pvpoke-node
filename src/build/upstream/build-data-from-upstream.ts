import { sliceUpstreamGamemaster } from './slice-upstream-gamemaster'
import { transformPvpokePokedexEntry } from '../transforms/transform-pvpoke-pokedex-entry'
import { transformPvpokeMove } from '../transforms/transform-pvpoke-move'
import { writeObjAsJson } from '../util'

export const buildDataFromUpstream = async () => {
  const { 
    pokemon: pvpokePokemon, 
    moves: pvpokeMoves 
  } = await sliceUpstreamGamemaster()

  await writeObjAsJson( 
    './src/sandbox/data/pvpoke-pokedex.json', pvpokePokemon 
  )
  await writeObjAsJson( './src/sandbox/data/pvpoke-moves.json', pvpokeMoves )

  const pokedex = pvpokePokemon.map( transformPvpokePokedexEntry ) 
  const moves = pvpokeMoves.map( transformPvpokeMove )

  await writeObjAsJson( './src/data/pokedex.json', pokedex )
  await writeObjAsJson( './src/data/moves.json', moves )
}

if( !module.parent ) buildDataFromUpstream()
