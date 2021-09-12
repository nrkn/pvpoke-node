import initDom from 'jsdom-global'
import { promises } from 'fs'
import { readPathBufferMap } from '@mojule/files'
import { PathBufferMap } from '@mojule/files/dist/types'

const { readFile } = promises

type JsArg = string | { raw: string }

const getJs = ( map: PathBufferMap, path: string ) => {
  const buffer = map[ path ]

  if( !buffer ) throw Error( `Expected ${ path }` )

  return buffer.toString( 'utf8' )
}

const appendJs = ( map: PathBufferMap, ...jsArgs: JsArg[] ) => {
  jsArgs.forEach( 
    js => (
      typeof js === 'string' ? 
      appendJsRaw( getJs( map, js ) ) : 
      appendJsRaw( js.raw ) 
    )
  ) 
}

const appendJsRaw = ( js: string ) => {
  const script = document.createElement( 'script' )
  script.text = js
  document.body.append( script )
}

const getJson = ( path: string, cb: ( data: any ) => void ) => {
  path = path.replaceAll( '?v=', '' )

  readFile( path, 'utf8' ).then( json => cb( JSON.parse( json ) ) ).catch(
    err => {throw Error( err )}
  )
}

const start = async () => {
  const html = await readFile( './public/index.html', 'utf8' )

  initDom( html, { runScripts: 'dangerously', resources: 'usable' } )

  window[ 'webRoot' ] = './public/'
  window[ 'siteVersion' ] = ''
  window[ 'getJson' ] = getJson
  window[ 'host' ] = 'localhost'
  window[ 'settings' ] = {
    defaultIVs: "gamemaster",
    animateTimeline: 1,
    matrixDirection: "row",
    gamemaster: "gamemaster",
    pokeboxId: 0,
    pokeboxLastDateTime: 0,
    xls: true
  }
  window[ 'get' ] = false

  const jsBufferMap = await readPathBufferMap( './public/js' )

  appendJs( 
    jsBufferMap, 
    'libs/jquery-3.3.1.min.js',
    'GameMaster.js',
    'interface/Interface.js',
    'interface/PokeSearch.js',
    'battle/Ranker.js',
    'battle/Battle.js',
    // patch jquery
    { raw: '$.getJSON = getJson' }
  )

  const GameMaster = window[ 'GameMaster' ]
  
  const gm = GameMaster.getInstance()

  console.log( gm )
}

start().catch( console.error )
