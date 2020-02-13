import { BattlePlayer } from './types'
import { BattlePokemonTeam, PokemonTeam } from '../pokemon/types'
import { createBattlePokemon } from '../pokemon'

export const createPlayer = ( pokemonTeam: PokemonTeam ) => {
  const team = pokemonTeam.map( createBattlePokemon ) as BattlePokemonTeam
  const shields = 2
  const switchCooldown = 0

  const player: BattlePlayer = { team, shields, switchCooldown }

  return player
}

export const getRemainingPokemon = ( player: BattlePlayer ) =>
  player.team.filter( p => p.hp > 0 )

export const canSwitch = ( player: BattlePlayer ) => player.switchCooldown <= 0
