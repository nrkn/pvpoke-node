import { SpeciesTypes } from '../entities/pokedex/types'
import { getTypeTraits } from '../entities/pokemon-types/traits'
import { PokemonType } from '../entities/pokemon-types/types'

export const getEffectiveness = (
  moveType: PokemonType, [ primary, secondary ]: SpeciesTypes
) => {
  const effectiveness = effectivenessModifier( moveType, primary )

  if ( secondary === 'none' ) return effectiveness

  return effectiveness * effectivenessModifier( moveType, secondary )
}

export const effectivenessModifier = (
  moveType: PokemonType, targetType: PokemonType
) => {
  const traits = getTypeTraits()
  const { weaknesses, resistances, immunities } = traits[ targetType ]

  if ( weaknesses.includes( moveType ) ) return 1.6

  if ( resistances.includes( moveType ) ) return 0.625

  if ( immunities.includes( moveType ) ) return 0.390625

  return 1
}
