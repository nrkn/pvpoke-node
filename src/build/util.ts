import { promises } from 'fs'

const { writeFile } = promises

export const writeObjAsJson = async ( 
  path: string,
  obj: any,
  replacer: (number | string)[] | null = null, 
  space: string | number = 2
) => 
  writeFile( path, JSON.stringify( obj, replacer, space ), 'utf8' )
