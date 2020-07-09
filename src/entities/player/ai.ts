import { AIStrategy, BattleAI } from './types'
import { Pokemon, BattlePokemon, PokemonTeam, BattlePokemonTeam
       } from '../pokemon/types'
import { RosterPerformance } from '../battle/types'

export const generateRoster = ( size: number ): Pokemon[] =>  {
  return []
}

export const generateTeam = ( opponentRoster: Pokemon[],
                              previousResult: boolean, /* true = Win */
                              previousTeams: Pokemon[][]
                            ): PokemonTeam => {
  return undefined
}

export const calculateAverageRosterPerformance = ( userTeam: PokemonTeam,
                                                   opponentTeam: PokemonTeam
                                                 ): RosterPerformance[] => {
  return undefined
}
