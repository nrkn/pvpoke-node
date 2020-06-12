import { Maybe, Nothing, isNothing, fromJust } from '@typed/maybe';
import * as legacyPokedex from './data/pvpoke-pokedex.json';
import { getPokedexEntryById } from '../entities/pokedex/index.js';
import { getDefaultIvs } from '../calculator/ivs.js';
import { LevelStats } from '../entities/pokedex/types.js';

function compare( values: number[]
                , stats:  LevelStats
                ):        Maybe<[string, number]> {
  const [ level, atk, def, hp ] = values;

  if ( stats.level !== level )
    return Maybe.of<[string, number]>([ 'level', level ]);
  if ( stats.atk !== atk )
    return Maybe.of<[string, number]>([ 'atk', atk ]);
  if ( stats.def !== def )
    return Maybe.of<[string, number]>([ 'def', def ]);
  if ( stats.hp !== hp )
    return Maybe.of<[string, number]>([ 'hp', hp ]);
  return Nothing;
}

for( let i = 0; i < legacyPokedex.length; i++ ){
  const p = legacyPokedex[ i ];

  console.log(
    `Checking ${ p.speciesName }, ${ i + 1 }/${ legacyPokedex.length }`
  );

  const { defaultIVs } = p;

  const maybeDexEntry = getPokedexEntryById( p.speciesId )!;
  if ( isNothing(maybeDexEntry) ) continue;
  const dexEntry = fromJust( maybeDexEntry );

  const def1500 = getDefaultIvs( dexEntry, 1500 );
  const def2500 = getDefaultIvs( dexEntry, 2500 );

  const maybeCompare1500 = compare( defaultIVs.cp1500, def1500 );
  if ( isNothing( maybeCompare1500 ) ) continue;
  const compare1500 = fromJust( maybeCompare1500 );

  if( compare1500 ){
    const [ key, value ] = compare1500;

    console.log( `1500 failed on ${ p.speciesName }` );
    console.log(
      `Data for ${ key } was ${ value } but generated ${ def1500[ key ] }`
    );

    console.log( defaultIVs.cp1500 );
    console.log( def1500 );

    break;
  }

  const maybeCompare2500 = compare( defaultIVs.cp2500, def2500 );
  if ( isNothing( maybeCompare2500 ) ) continue;
  const compare2500 = fromJust( maybeCompare2500 );

  if ( compare2500 ) {
    const [ key, value ] = compare2500;

    console.log( `2500 failed on ${ p.speciesName }` );
    console.log(
      `Data for ${ key } was ${ value } but generated ${ def2500[ key ] }`
    );

    console.log( defaultIVs.cp2500 );
    console.log( def2500 );

    break;
  }

  console.log( 'Passed' );
}
