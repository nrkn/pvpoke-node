import {
  PokedexEntry, Stats, IVCombination, LevelStats
} from '../entities/pokedex/types'

import { getCpm, getCp, getCpFromLevel } from './stats'

export const getDefaultIvs = (
  dexEntry: PokedexEntry, cpLimit: number
): LevelStats => {
  let stats: LevelStats = { level: 40, atk: 15, def: 15, hp: 15 };

  const maxCp = getCpFromLevel( dexEntry.baseStats, stats, 40 );

  if ( maxCp <= cpLimit ) return stats;

  const combinations = getIvCombinations(
    dexEntry, 'overall', 1, 4096, cpLimit
  );

  const defaultIndex = Math.floor( combinations.length * 0.12207 );

  const combination = combinations[ defaultIndex ];

  return {
    level: combination.level, ...combination.ivs
  };
};

export const getIvCombinations = (
  dexEntry: PokedexEntry,
  sortStat: keyof Omit<IVCombination,'ivs'>,
  sortDirection: number,
  resultCount: number,
  targetCp: number,
  levelCap = 40,
  predicate: ( combination: IVCombination ) => boolean = () => true
) => {
  const { tags, speciesId, baseStats } = dexEntry;

  const combinations: IVCombination[] = [];

  let level = levelCap;
  let atk = 15;
  let def = 15;
  let hp = 15;
  let calcCP = 0;
  let bestStat = 0;
  let cpm = 0;

  if ( sortDirection == -1 ) {
    bestStat = 10000;
  }

  let floor = 0;

  if ( tags.includes( 'legendary' ) ) floor = 1;
  if ( untradables.includes( speciesId ) ) floor = 10;
  if ( maxNear1500.includes( speciesId ) && resultCount > 1 ) floor = 12;

  while ( hp >= floor ) {
    def = 15;

    while ( def >= floor ) {
      atk = 15;

      while ( atk >= floor ) {
        level = 0.5;
        calcCP = 0;

        while ( level < levelCap && calcCP < targetCp ) {
          level += 0.5;
          cpm = getCpm( level );
          calcCP = getCp( baseStats, { atk, def, hp }, cpm );
        }

        if ( calcCP > targetCp ) {
          level -= 0.5;
          cpm = getCpm( level );
          calcCP = getCp( baseStats, { atk, def, hp }, cpm );
        }

        if ( calcCP <= targetCp ) {
          const combination = createCombination(
            baseStats, { atk, def, hp }, cpm, level, calcCP
          );

          const valid = validateCombination(
            combination, bestStat, sortStat, sortDirection, resultCount,
            predicate
          );

          if ( valid ) {
            combinations.push( combination );
          }
        }
        atk--;
      }
      def--;
    }
    hp--;
  }

  combinations.sort(
    ( a, b ) =>
      ( a[ sortStat ] > b[ sortStat ] ) ?
      ( -1 * sortDirection ) :
      (
        ( b[ sortStat ] > a[ sortStat ] ) ?
        ( 1 * sortDirection ) : 0
      )
  );

  return combinations.splice( 0, resultCount );
}

const untradables = [
  'mew', 'celebi', 'deoxys_attack', 'deoxys_defense', 'deoxys_speed', 'deoxys',
  'jirachi', 'darkrai'
];

const maxNear1500 = [ 'bastiodon' ];

const createCombination = (
  baseStats: Stats,
  ivs: Stats,
  cpm: number,
  level: number,
  cp: number
) => {
  const atk = cpm * ( baseStats.atk + ivs.atk );
  const def = cpm * ( baseStats.def + ivs.def );
  const hp = Math.floor( cpm * ( baseStats.hp + ivs.hp ) );
  const overall = ( hp * atk * def );

  const combination: IVCombination = { level, ivs, atk, def, hp, overall, cp };

  return combination;
};

const validateCombination = (
  combination: IVCombination,
  bestStat: number,
  sortStat: keyof Omit<IVCombination, 'ivs'>,
  sortDirection: number,
  resultCount: number,
  predicate: ( combination: IVCombination ) => boolean = () => true
) => {
  let valid = true

  /*
    This whole jumble won't include combinations that don't beat our
    best or worst if we just want one result
  */
  if ( resultCount == 1 ) {
    if ( sortDirection == 1 ) {
      if ( combination[ sortStat ] < bestStat ) {
        valid = false
      }
    } else if ( sortDirection == -1 ) {
      if ( combination[ sortStat ] > bestStat ) {
        valid = false
      }
    }

    if ( valid ) {
      bestStat = combination[ sortStat ]
    }
  }

  if ( valid ) {
    valid = predicate( combination )
  }

  return valid
}

/* CP = ( baseAtk + ivAtk )     *
        ( baseDef + ivDef )^0.5 *
        ( baseHP + ivHP )^0.5   *
        CPM^2                   /
        10.0

*/
