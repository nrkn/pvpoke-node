import { Pokemon, BattlePokemon } from './types'
import { getCalculatedStats } from '../../calculator/stats'
import { Buff } from '../moves/types'

export const createBattlePokemon = ( pokemon: Pokemon ) => {
  const { hp } = getPokemonStats( pokemon )
  const cooldown = 0
  const energy = 0
  const buffs: Buff = { atk: 0, def: 0 }

  const battlePokemon: BattlePokemon = Object.assign(
    {},
    pokemon,
    { hp, cooldown, energy, buffs }
  )

  return battlePokemon
}

export const getPokemonName = ( pokemon: Pokemon ) =>
  pokemon.customName || pokemon.dexEntry.speciesName

export const getPokemonStats = ( pokemon: Pokemon ) =>
  getCalculatedStats( pokemon.dexEntry.baseStats, pokemon.ivs, pokemon.level )
