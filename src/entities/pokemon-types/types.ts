export type PokemonType = (
  'bug' | 'dark' | 'dragon' | 'electric' | 'fairy' | 'fighting' | 'fire' |
  'flying' | 'ghost' | 'grass' | 'ground' | 'ice' | 'normal' | 'poison' |
  'psychic' | 'rock' | 'steel' | 'water'
)

export type TypeTrait = {
  resistances: PokemonType[]
  weaknesses: PokemonType[]
  immunities: PokemonType[]
}

export type TypeTraitMap = Record<PokemonType, TypeTrait>
