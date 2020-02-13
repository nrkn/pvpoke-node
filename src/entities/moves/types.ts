import { PokemonType } from '../pokemon-types/types'

export type Move = (
  MoveFields &
  Partial<FastMoveFields> &
  Partial<ChargeMoveFields> &
  Partial<BuffedChargeMoveFields>
)

export type FastMove = MoveFields & FastMoveFields

export type ChargeMove = (
  MoveFields &
  ChargeMoveFields &
  Partial<BuffedChargeMoveFields>
)

export type BuffedChargeMove = (
  MoveFields &
  ChargeMoveFields &
  BuffedChargeMoveFields
)

export type MovePool = {
  fastMoves: FastMove[]
  chargeMoves: ChargeMove[]
}

export type Buff = {
  atk: number
  def: number
}

export type BuffTarget = 'self' | 'opponent'

type MoveFields = {
  moveId: string,
  name: string,
  type: PokemonType,
  power: number,
  cooldown: number
}

type FastMoveFields = {
  energyGain: number
}

type ChargeMoveFields = {
  energy: number
}

type BuffedChargeMoveFields = {
  buffs: Buff,
  buffTarget: BuffTarget,
  buffApplyChance: number
}
