import { Stats, PokedexEntry } from '../pokedex/types'
import { FastMove, ChargeMove, Buff } from '../moves/types'

export type Pokemon = {
  dexEntry: PokedexEntry
  customName?: string
  level: number
  ivs: Stats
  fastMove: FastMove
  chargeMove: ChargeMove
  secondChargeMove?: ChargeMove
}

export type BattlePokemon = Pokemon & {
  hp: number
  energy: number
  cooldown: number
  buffs: Buff
}

export type PokemonTeam = [ Pokemon, Pokemon, Pokemon ]

export type BattlePokemonTeam = [ BattlePokemon, BattlePokemon, BattlePokemon ]
