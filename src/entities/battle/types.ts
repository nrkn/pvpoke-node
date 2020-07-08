import { BattlePlayer } from '../player/types';

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
