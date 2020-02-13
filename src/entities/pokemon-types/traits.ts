import { TypeTraitMap } from './types'

export const getTypeTraits = (): TypeTraitMap => ({
  bug: {
    resistances: [ 'fighting', 'ground', 'grass' ],
    weaknesses: [ 'flying', 'rock', 'fire' ],
    immunities: []
  },
  dark: {
    resistances: [ 'ghost', 'dark' ],
    weaknesses: [ 'fighting', 'fairy', 'bug' ],
    immunities: [ 'psychic' ]
  },
  dragon: {
    resistances: [ 'fire', 'water', 'grass', 'electric' ],
    weaknesses: [ 'dragon', 'ice', 'fairy' ],
    immunities: []
  },
  electric: {
    resistances: [ 'flying', 'steel', 'electric' ],
    weaknesses: [ 'ground' ],
    immunities: []
  },
  fairy: {
    resistances: [ 'fighting', 'bug', 'dark' ],
    weaknesses: [ 'poison', 'steel' ],
    immunities: [ 'dragon' ]
  },
  fighting: {
    resistances: [ 'rock', 'bug', 'dark' ],
    weaknesses: [ 'flying', 'psychic', 'fairy' ],
    immunities: []
  },
  fire: {
    resistances: [ 'bug', 'steel', 'fire', 'grass', 'ice', 'fairy' ],
    weaknesses: [ 'ground', 'rock', 'water' ],
    immunities: []
  },
  flying: {
    resistances: [ 'fighting', 'bug', 'grass' ],
    weaknesses: [ 'rock', 'electric', 'ice' ],
    immunities: [ 'ground' ]
  },
  ghost: {
    resistances: [ 'poison', 'bug' ],
    weaknesses: [ 'ghost', 'dark' ],
    immunities: [ 'normal', 'fighting' ]
  },
  grass: {
    resistances: [ 'ground', 'water', 'grass', 'electric' ],
    weaknesses: [ 'flying', 'poison', 'bug', 'fire', 'ice' ],
    immunities: []
  },
  ground: {
    resistances: [ 'poison', 'rock' ],
    weaknesses: [ 'water', 'grass', 'ice' ],
    immunities: [ 'electric' ]
  },
  ice: {
    resistances: [ 'ice' ],
    weaknesses: [ 'fighting', 'fire', 'steel', 'rock' ],
    immunities: []
  },
  normal: {
    resistances: [],
    weaknesses: [ 'fighting' ],
    immunities: [ 'ghost' ]
  },
  poison: {
    resistances: [ 'fighting', 'poison', 'bug', 'fairy', 'grass' ],
    weaknesses: [ 'ground', 'psychic' ],
    immunities: []
  },
  psychic: {
    resistances: [ 'fighting', 'psychic' ],
    weaknesses: [ 'bug', 'ghost', 'dark' ],
    immunities: []
  },
  rock: {
    resistances: [ 'normal', 'flying', 'poison', 'fire' ],
    weaknesses: [ 'fighting', 'ground', 'steel', 'water', 'grass' ],
    immunities: []
  },
  steel: {
    resistances: [
      'normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice',
      'dragon', 'fairy'
    ],
    weaknesses: [ 'fighting', 'ground', 'fire' ],
    immunities: [ 'poison' ]
  },
  water: {
    resistances: [ 'steel', 'fire', 'water', 'ice' ],
    weaknesses: [ 'grass', 'electric' ],
    immunities: []
  }
})