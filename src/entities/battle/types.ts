import { BattlePlayer } from '../player/types';
import { Pokemon } from '../pokemon/types';

export enum ScenarioType {
  BOTH_BAIT,
  NEITHER_BAIT,
  NO_BAIT,
  FARM
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
  BASIC,
  BEST,
  COUNTER,
  UNBALANCED,
  SAME_TEAM,
  SAME_TEAM_DIFFERENT_LEAD,
  COUNTER_LAST_LEAD
}

export type DecisionOption = {
  decisionType: DecisionOptionType
  weight: number
}
