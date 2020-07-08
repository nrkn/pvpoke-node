import { RosterPerformance } from './types'

export const compareRosterPerformace = ( a: RosterPerformance,
                                         b: RosterPerformance
                                       ): number => a.average - b.average;
