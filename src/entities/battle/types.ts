import { BattlePlayer } from '../player/types';
import { Pokemon } from '../pokemon/types';

export enum ScenarioType {
  BOTH_BAIT    = 'both_bait',
  NEITHER_BAIT = 'neither_bait',
  NO_BAIT      = 'no_bait',
  FARM         = 'farm'
}

export type Scenario = {
  opponent: BattlePlayer
  name: ScenarioType
  matchups: number[]
  average: number
  minShields: number
}

export type RosterPerformance = {
  pokemon: Pokemon
  scenarios: Scenario[]
  average: number
}

export enum DecisionOptionType {
  BASIC                    = 'basic',
  BEST                     = 'best',
  COUNTER                  = 'counter',
  UNBALANCED               = 'unbalanced',
  SAME_TEAM                = 'same_team',
  SAME_TEAM_DIFFERENT_LEAD = 'same_team_different_lead',
  COUNTER_LAST_LEAD        = 'counter_last_lead'
}

export type DecisionOption = {
  decisionType: DecisionOptionType
  weight: number
}
