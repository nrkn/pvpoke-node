import { Maybe } from '@typed/maybe';
import { PokedexEntry } from './types'
import * as pokedexData from '../../data/pokedex.json'

export function getPokedex(): readonly PokedexEntry[] {
  return pokedexData as PokedexEntry[];
}

const idToEntryMap = new Map<string, PokedexEntry>();
const idToShadowMap = new Map<string, boolean>();

export function getPokedexEntryById( id: string ): Maybe<PokedexEntry> {
  return Maybe.of<PokedexEntry>( idToEntryMap.get( id ) );
}

export function isShadowPokemon( id: string ): boolean {
  return idToShadowMap.get( id ) === true;
}

getPokedex().forEach( p => {
  idToEntryMap.set( p.speciesId, p )
  idToShadowMap.set( p.speciesId, p.tags.includes( 'shadow' ) )
} );
