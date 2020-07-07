import { 
  BuffedChargeMove, FastMove, ChargeMove, BuffTarget 
} from '../entities/moves/types'

export const transformPvpokeMove = ( m: any ) => {
  const {
    moveId, name, type, power, cooldown, energyGain, energy, buffs, buffTarget,
    buffApplyChance
  } = m
  
  if( energy === 0 ){
    const fastMove: FastMove = {
      moveId, name, type, power, cooldown, energyGain
    }

    return fastMove
  }

  if( energyGain === 0 ){
    const chargeMove: ChargeMove = {
      moveId, name, type, power, cooldown, energy
    }

    if( Array.isArray( buffs ) ){
      const [ atk, def ] = buffs

      chargeMove.buffs = { atk, def }
      chargeMove.buffTarget = buffTarget as BuffTarget
      chargeMove.buffApplyChance = parseFloat( buffApplyChance! )

      return chargeMove as BuffedChargeMove
    }

    return chargeMove
  }  

  throw Error( 'Unexpected move data' )
}
