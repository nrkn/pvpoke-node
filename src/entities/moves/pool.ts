import { PokedexEntry } from '../pokedex/types'
import { FastMove, ChargeMove, MovePool } from './types'
import { getMoveById } from '.'

export const createMovePool = ( dex: PokedexEntry ) => {
  let movePool = movePoolMap.get( dex.speciesId )

  if( movePool !== undefined ) return movePool

  const fastMoves = (
    dex.fastMoves.map( id => getMoveById( id ) as FastMove )
  )

  const chargeMoves = (
    dex.chargedMoves.map( id => getMoveById( id ) as ChargeMove )
  )

  movePool = { fastMoves, chargeMoves }
  movePoolMap.set( dex.speciesId, movePool )

  return movePool
}

const movePoolMap = new Map<string,MovePool>()
