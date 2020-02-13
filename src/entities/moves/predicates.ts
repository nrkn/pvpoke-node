import { Move, FastMove, ChargeMove, BuffedChargeMove } from './types'
import { PokedexEntry } from '../pokedex/types'

export const isFastMove = ( move: Move ): move is FastMove =>
  move.energy === 0 || move.energy === undefined

export const isChargeMove = ( move: Move ): move is ChargeMove =>
  move.energyGain === 0 || move.energyGain === undefined

export const isBuffedChargeMove = ( move: Move ): move is BuffedChargeMove =>
  move.buffs !== undefined

export const isLegacyMove = ( move: Move, dex: PokedexEntry ) =>
  dex.legacyMoves.includes( move.moveId )
