import { PokemonType } from '../pokemon-types/types'

export type PokedexEntry = {
  dex: number
  speciesName: string
  speciesId: string
  baseStats: Stats,
  types: SpeciesTypes,
  fastMoves: string[],
  chargedMoves: string[],
  legacyMoves: string[],
  tags: string[]
}

export type Stats = {
  atk: number
  def: number
  hp: number
}

export type SpeciesTypes = [ PokemonType, PokemonType | 'none' ]

export type LevelStats = { level: number } & Stats

export type IVCombination = LevelStats & {
  ivs: Stats
  overall: number
  cp: number
}
