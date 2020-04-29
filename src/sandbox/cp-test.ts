import { Maybe, fromJust, isJust } from '@typed/maybe';
import { getPokedexEntryById } from '../entities/pokedex';
import { getCpFromLevel } from '../calculator/stats';

const maybeMewtwoDex = getPokedexEntryById( 'mewtwo' )!;
if ( isJust( maybeMewtwoDex ) ) {

  const mewtwoDex = fromJust( maybeMewtwoDex );

  const cp = getCpFromLevel(
    mewtwoDex.baseStats, { atk: 15, def: 12, hp: 15 }, 40
  );

  console.log( cp );
} else {
  console.error( "Mewtwo's pokedex entry could not be found!" );
}
