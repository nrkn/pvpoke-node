/* -*- mode: typescript; -*- */
/* ========================================================================== *
 *  This utility can slice PvPoke's `gamemaster.json' file into smaller files
 *  for faster access.
 *
 *  Ideally will can be extended to parse the `GameMaster.json' file directly
 *  from the app's APK.
 * ========================================================================= */

import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import * as download from 'download';

const pvpokeGMURL : string = 'https://raw.githubusercontent.com/' +
                             'pvpoke/pvpoke/master/src/data/gamemaster.json';

/* Add more keys here. Keys must be root keys from gamemaster.json */
const targetKeys : string[] = [ 'moves', 'pokemon' ];


const downloadGM = async ( outfile : string ) : Promise<void> =>
  fs.writeFileSync( outfile, await download( pvpokeGMURL ) );

const sliceKeyToFile = async ( gmJSON : any, key : string, outfile : string ) =>
  fs.writeFileSync( outfile, JSON.stringify( gmJSON[key] ) );


/* Download gamemaster.json to a temporary directory, and slice keys. */
fs.mkdtemp( path.join( tmpdir(), 'gm-' ), async ( err, workDir ) => {
  if ( err ) throw err;
  const gmPath : string = path.join( workDir, 'gamemaster.json' );
  await downloadGM( gmPath );
  var gmData : string = await fs.readFileSync( gmPath, 'utf8' );
  var gmJSON : any = JSON.parse( gmData );
  await Promise.all( targetKeys.map( k => {
    var outpath = path.join( __dirname, '../data/' + k + '.json' );
    sliceKeyToFile( gmJSON, k, outpath );
  } ) );
  await fs.unlinkSync( gmPath );
  await fs.rmdirSync( workDir );
} );


/* ========================================================================= */
/* vim: set filetype=typescript : */
