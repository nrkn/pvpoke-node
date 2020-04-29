import { PokemonType } from './types'

export default function getPokemonTypes(): PokemonType[] {
  return [ 'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire'
         , 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison'
         , 'psychic', 'rock', 'steel', 'water'
         ];
}
