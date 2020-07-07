import { PokedexEntry } from './types'
import * as pokedexData from '../../data/pokedex.json'

export const getPokedex = (): readonly PokedexEntry[] =>
  pokedexData as PokedexEntry[]

export const getPokedexEntryById = ( id: string ) => idToEntryMap.get( id )

export const isShadowPokemon = ( id: string ) =>
  idToShadowMap.get( id ) === true

const idToEntryMap = new Map<string, PokedexEntry>()

const idToShadowMap = new Map<string,boolean>()

getPokedex().forEach( p => {
  idToEntryMap.set( p.speciesId, p )
  idToShadowMap.set( p.speciesId, p.tags.includes( 'shadoweligible' ) )
} )
