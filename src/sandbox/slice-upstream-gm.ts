/* -*- mode: typescript; -*- */
/* ========================================================================== *
 *  This utility can slice PvPoke's `gamemaster.json' file into smaller files
 *  for faster access.
 *
 *  Ideally will can be extended to parse the `GameMaster.json' file directly
 *  from the app's APK.
 * ========================================================================= */

import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import { tmpdir } from 'os';

const pvpokeGMURL : string = 'http://raw.githubusercontent.com/' +
                             'pvpoke/pvpoke/master/src/data/gamemaster.json';

const downloadGM = ( outfile : string ) => {
  var f = fs.createWriteStream( outfile );
  http.get( pvpokeGMURL, ( resp ) => {
    resp.pipe( f );
    f.on( 'finish', () => f.close() );
  });
};

const sliceKeyToFile = ( gmFile : string, key : string, outfile : string ) => {
  fs.readFile( gmFile, ( err, data ) => {
    if ( err ) throw err;
    let gm : Object = data.toJSON();
    fs.writeFile( outfile, gm[key], ( err ) => {
      if ( err ) throw err;
      console.log( 'Key ' + key + ' saved to: ' + outfile );
    } );
  } );
};

fs.mkdtemp( path.join( tmpdir(), 'gm-' ), ( err, workDir ) => {
  if ( err ) throw err;
  console.log( workDir );
  const gmPath = path.join( workDir, 'gamemaster.json' );
  downloadGM( gmPath );
  const targetKeys : string[] = [ 'moves', 'pokemon' ];
  for ( let k of targetKeys ) {
    /* FIXME make path absolute */
    sliceKeyToFile( gmPath, k, path.join( 'dist/data/' + k + '.json' ) );
  }
  fs.unlink( gmPath,  ( err ) => { if ( err ) throw err;} );
  fs.rmdir( workDir, ( err ) => { if ( err ) throw err; } );
} );


/* ========================================================================= */
/* vim: set filetype=typescript : */
