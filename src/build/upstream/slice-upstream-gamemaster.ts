/* -*- mode: typescript; -*- */
/* ========================================================================== *
 *  This utility can slice PvPoke's `gamemaster.json' file into smaller files
 *  for faster access.
 *
 *  Ideally will can be extended to parse the `GameMaster.json' file directly
 *  from the app's APK.
 * ========================================================================= */

import * as download from 'download'

const gamemasterUri =
  'https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/gamemaster.json'

/* Download gamemaster.json and slice keys. */
export const sliceUpstreamGamemaster = async () => {
  const buffer = await download( gamemasterUri )
  const gamemasterJSON = buffer.toString( 'utf8' )
  const gamemaster = JSON.parse(gamemasterJSON)

  const { pokemon, moves } = gamemaster

  if( !Array.isArray( pokemon ) ) throw Error( 'Expected a pokemon array' )
  if( !Array.isArray( moves ) ) throw Error( 'Expected a moves array' )

  return { pokemon, moves }
}

/* ========================================================================= */
/* vim: set filetype=typescript : */
