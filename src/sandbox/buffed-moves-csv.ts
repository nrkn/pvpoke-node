import { getBuffedChargeMoves } from '../entities/moves'
import { BuffedChargeMove } from '../entities/moves/types'
import { getPokedex } from '../entities/pokedex'

export const createBuffedMovesCsv = () => {
  const monsMap = new Map<BuffedChargeMove, string[]>()

  buffMoves.forEach( m => {
    let mons = monsMap.get( m )

    if ( mons === undefined ) {
      mons = []
      monsMap.set( m, mons )
    }

    pokedex.forEach( p => {
      if ( p.chargedMoves.includes( m.moveId ) ) {
        mons!.push( p.speciesName )
      }
    } )
  } )

  const rows: string[] = [ headerRow ]

  monsMap.forEach( ( mons, move ) => {
    const {
      name, type, power, energy, cooldown, buffApplyChance, buffTarget, buffs
    } = move

    const { atk, def } = buffs

    const pokemon = mons.join( '; ' )

    const buffChance = ( buffApplyChance * 100 ).toFixed( 1 ) + '%'

    const row = [
      name, type, power, energy, cooldown, buffChance, buffTarget, atk,
      def, pokemon
    ].join( ',' )

    rows.push( row )
  } )

  const csv = rows.join( '\n' )

  return csv
}

const buffMoves = getBuffedChargeMoves()
const pokedex = getPokedex()

const headerRow = [
  'Move', 'Type', 'Power', 'Energy', 'Cooldown', 'Buff Chance', 'Buff Target',
  'Attack Buff', 'Defense Buff', 'Pokemon with Move'
].join( ',' )
