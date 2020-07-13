import { BattlePokemonTeam } from '../pokemon/types'

export type BattlePlayer = {
  team: BattlePokemonTeam
  shields: 0 | 1 | 2
  switchCooldown: number
}

export enum AIDifficulty {
  NOVICE   = 'novice',
  RIVAL    = 'rival',
  ELITE    = 'elite',
  CHAMPION = 'champion'
}

export enum AIStrategy {
  DEFAULT                   = 'default',
  SHIELD                    = 'shield',
  SWITCH_BASIC              = 'switch_basic',
  SWITCH_FARM               = 'switch_farm',
  SWITCH_ADVANCED           = 'switch_advanced',
  FARM_ENERGY               = 'farm_energy',
  OVERFARM                  = 'overfarm',
  BAIT_SHIELDS              = 'bait_shields',
  WAIT_CLOCK                = 'wait_clock',
  PRESERVE_SWITCH_ADVANTAGE = 'preserve_switch_advantage',
  ADVANCED_SHIELDING        = 'advanced_shielding',
  BAD_DECISION_PROTECTION   = 'bad_decision_protection',
  SACRIFICIAL_SWAP          = 'sacrificial_swap'
}

export type AI = {
  level: AIDifficulty
  chargedMoveCount: number
  energyGuessRange: number
  moveGuessCertainty: number
  reactionTime: number
  ivComboRange: number
  strategies: AIStrategy[]
}

export type BattleAI = BattlePlayer & AI & {
  farmEnergy: boolean
  baitShields: boolean
}
