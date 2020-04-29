import { Move, FastMove, ChargeMove, BuffedChargeMove } from './types'
import { isFastMove, isChargeMove, isBuffedChargeMove } from './predicates'
import * as movesData from '../../data/moves.json'

export const getMoves = () => movesData as Move[];

export const getFastMoves = () => fastMoves as FastMove[];

export const getChargeMoves = () => chargeMoves as ChargeMove[];

export const getBuffedChargeMoves = () =>
  buffedChargeMoves as BuffedChargeMove[];

export const getMoveById = ( id: string ) => idToMoveMap.get( id );

const idToMoveMap = new Map<string, Move>();
const fastMoves: FastMove[] = [];
const chargeMoves: ChargeMove[] = [];
const buffedChargeMoves: BuffedChargeMove[] = [];

getMoves().forEach( m => {
  idToMoveMap.set( m.moveId, m )

  if ( isFastMove( m ) ){
    fastMoves.push( m )
  } else if( isChargeMove( m ) ){
    chargeMoves.push( m )

    if ( isBuffedChargeMove( m ) ) {
      buffedChargeMoves.push( m )
    }
  }
} );
