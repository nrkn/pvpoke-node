import { Move, FastMove, ChargeMove, BuffTarget } from '../entities/moves/types'
import { PokemonType } from '../entities/pokemon-types/types'

import * as legacyMoveData from './data/pvpoke-moves.json'

const moves: Move[] = []

legacyMoveData.forEach( m => {
  const {
    moveId, name, type, power, cooldown, energyGain, energy, buffs, buffTarget,
    buffApplyChance
  } = m

  if( energy === 0 ){
    const fastMove: FastMove = {
      moveId, name, type: type as PokemonType, power, cooldown, energyGain
    }

    moves.push( fastMove )
  }

  if( energyGain === 0 ){
    const chargeMove: ChargeMove = {
      moveId, name, type: type as PokemonType, power, cooldown, energy
    }

    if( Array.isArray( buffs ) ){
      const [ atk, def ] = buffs

      chargeMove.buffs = { atk, def }
      chargeMove.buffTarget = buffTarget as BuffTarget
      chargeMove.buffApplyChance = parseFloat( buffApplyChance! )
    }

    moves.push( chargeMove )
  }
} )

console.log( JSON.stringify( moves, null, 2 ) )
