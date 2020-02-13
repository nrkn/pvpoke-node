import { BattlePokemon } from '../pokemon/types'

export type BattlePlayer = {
  team: [ BattlePokemon, BattlePokemon, BattlePokemon ]
  shields: 0 | 1 | 2
  switchCooldown: number
}
