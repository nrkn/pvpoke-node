import { Stats } from '../entities/pokedex/types'

export const getCpm = ( level: number ) => {
  const memoized = levelToCpmMap.get( level );

  if( memoized ) return memoized;

  const cpm = (
    level % 1.0 === 0 ?
    cpms[ level - 1 ] :
    Math.sqrt(
      (
        Math.pow( cpms[ Math.floor( level - 1.0 ) ], 2.0 ) +
        Math.pow( cpms[ Math.ceil( level - 1.0 ) ], 2.0 )
      ) / 2.0
    )
  );

  levelToCpmMap.set( level, cpm )

  return cpm;
};

const levelToCpmMap = new Map<number,number>();

/* Stats scaled by the CP Modifier of a given level */
export const getCalculatedStats = (
  baseStats: Stats, ivs: Stats, level: number
): Stats => {
  const cpm = getCpm( level );

  const atk = cpm * ( baseStats.atk + ivs.atk );
  const def = cpm * ( baseStats.def + ivs.def );
  const hp = Math.max( Math.floor( cpm * ( baseStats.hp + ivs.hp ) ), 10.0 );

  return { atk, def, hp };
};

/* Get CP from Stats, IVs, and CPM */
export const getCp = ( baseStats: Stats, ivs: Stats, cpm: number ) => {
  /*    CP = Atk * sqrt( Def * HP ) * ( CPM )^2 / 10    */
  const atk = baseStats.atk + ivs.atk;
  const def = baseStats.def + ivs.def;
  const hp  = baseStats.hp + ivs.hp;
  const cp = Math.floor(
      atk * Math.sqrt( def * hp ) * Math.pow( cpm, 2.0 ) / 10.0
  );
  return Math.max( cp, 10.0 );
};

export const getCpFromLevel = ( baseStats: Stats, ivs: Stats, level: number ) =>
  getCp( baseStats, ivs, getCpm( level ) );




const cpms: readonly number[] = [
  0.093999997, 0.16639787, 0.21573247, 0.25572005, 0.29024988,
  0.3210876,   0.34921268, 0.37523559, 0.39956728, 0.42250001,
  0.44310755,  0.46279839, 0.48168495, 0.49985844, 0.51739395,
  0.53435433,  0.55079269, 0.56675452, 0.58227891, 0.59740001,
  0.61215729,  0.62656713, 0.64065295, 0.65443563, 0.667934,
  0.68116492,  0.69414365, 0.70688421, 0.71939909, 0.7317,
  0.73776948,  0.74378943, 0.74976104, 0.75568551, 0.76156384,
  0.76739717,  0.7731865,  0.77893275, 0.78463697, 0.79030001,
  0.79530001,  0.8003,     0.8053,     0.81029999, 0.81529999
];

const cpmStep: readonly number[] = [
  0.009426125469,
  0.008919025675,
  0.008924905903,
  0.004459460790
];

const cpmStepOfLevel = ( level: number ): number => {
  if ( level >= 40.0 ) return 0.0;
  return cpmStep[Math.floor( level / 10.0 )];
};

const cpmByStep = ( level: number ): number => {
  level = Math.min( level, 40.0 );
  let cpm = cpmStepOfLevel( 1 );
  for ( let l = 1.0; l < level; l+=0.5 ) {
    cpm = Math.sqrt( Math.pow( cpm, 2 ) + cpmStepOfLevel( l ) );
  }
  return cpm;
};
