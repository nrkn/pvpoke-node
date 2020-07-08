import * as gamemasterSchema from './gamemaster.schema.json'
import * as Ajv from 'ajv'

const ajv = new Ajv()
const validate = ajv.compile( gamemasterSchema )

export const assertGamemaster = ( obj: any ) => {
  const isValid = validate( obj )

  if( !isValid ){
    console.log( validate.errors )
    
    throw Error( 
      'Invalid gamemaster - pvpoke data structures have probably changed' 
    )
  }
}
