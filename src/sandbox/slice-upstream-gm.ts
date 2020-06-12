/* -*- mode: typescript; -*- */
/* ========================================================================== *
 *  This utility can slice PvPoke's `gamemaster.json' file into smaller files
 *  for faster access.
 *
 *  Ideally will can be extended to parse the `GameMaster.json' file directly
 *  from the app's APK.
 * ========================================================================= */

import { saveAs } from 'file-saver';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';

const pvpokeGMURL : string = 'https://raw.githubusercontent.com/' +
                             'pvpoke/pvpoke/master/src/data/gamemaster.json';

const downloadGM = ( outfile : string ) => saveAs( pvpokeGMURL, outfile );

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

fs.mkdtemp( path.join( tmpdir(), 'gm-' ), ( err, dir ) => {
  if ( err ) throw err;
  const workDir = dir;
  const gmPath = path.join( workDir, 'gamemaster.json' );
  downloadGM( gmPath );
  const targetKeys : string[] = [ 'moves', 'pokemon' ];
  for ( let k in targetKeys ) {
    sliceKeyToFile( gmPath, k, path.join( '../../data/' + k + '.json' ) );
  }
  fs.unlink( workDir, ( err ) => { if ( err ) throw err; } );
} );


/* ========================================================================= */
/* vim: set filetype=typescript : */
