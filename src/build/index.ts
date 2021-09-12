import { promises } from 'fs'

const { cp, rm } = promises

const start = async () => {
  await cp( './pvpoke/src/data', './public/data', { recursive: true } )
  await cp( './pvpoke/src/js', './public/js', { recursive: true } )
  await rm( './pvpoke', { recursive: true, force: true } )
}

start().catch( console.error )
