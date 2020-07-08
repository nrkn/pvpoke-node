import { BattlePokemon } from '../pokemon/types'

export type BattlePlayer = {
  team: [ BattlePokemon, BattlePokemon, BattlePokemon ]
  shields: 0 | 1 | 2
  switchCooldown: number
}

export enum AIStrategy {
  DEFAULT,
	SHIELD,
	SWITCH_BASIC,
	SWITCH_FARM,
	SWITCH_ADVANCED,
	FARM_ENERGY,
	OVERFARM,
	BAIT_SHIELDS,
	WAIT_CLOCK,
	PRESERVE_SWITCH_ADVANTAGE,
	ADVANCED_SHIELDING,
	BAD_DECISION_PROTECTION,
	SACRIFICIAL_SWAP
}

export type BattleAI = BattlePlayer & {
  name: string
  level: number
  chargedMoveCount: number
  energyGuessRange: number
  moveGuessCertainty: number
  reactionTime: number
  ivComboRange: number
  strategies: AIStrategy[]
}
