import { PokemonType } from '../entities/pokemon-types/types'
import { SpeciesTypes } from '../entities/pokedex/types'

export const getStabModifier = (
  moveType: PokemonType, speciesTypes: SpeciesTypes
) => isStab( moveType, speciesTypes ) ? 1.2 : 1

export const isStab = (
  moveType: PokemonType, [ primary, secondary ]: SpeciesTypes
) => moveType === primary || moveType === secondary
