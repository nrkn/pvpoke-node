# pvpoke implementation details

Most of the pvpoke source tree is related to the website

Only the following are interesting in terms of reimplementing the algorithms:

- `/src/data`
- `/src/js`

## `src/data`

The subfolders for `data` contain cached results of running the ranking 
algorithms for various leagues/cups etc. These will be useful for comparing the
output of our implementation.

The most important file here is `gamemaster.json` - I see there is also 
`gamemaster-mega.json` which I assume contains mega evolutions as well?

This file contains all the useful raw data - notably, the pokedex (stored as an 
array under `pokemon`) and the moves data (`moves`)

### gamemaster.pokemon

A single Pokedex entry looks like this in the raw data:

```json
{
  "dex": 3,
  "speciesName": "Venusaur",
  "speciesId": "venusaur",
  "baseStats": {
    "atk": 198,
    "def": 189,
    "hp": 190
  },
  "types": [ "grass", "poison" ],
  "fastMoves": [ "RAZOR_LEAF", "VINE_WHIP" ],
  "chargedMoves": [ 
    "FRENZY_PLANT", "PETAL_BLIZZARD", "SLUDGE_BOMB", "SOLAR_BEAM" 
  ],
  "tags": [ "starter", "shadoweligible" ],
  "defaultIVs": {
    "cp1500": [ 20.5, 6, 14, 8 ],
    "cp2500": [ 39, 5, 9, 12 ]
  },
  "level25CP": 1673,
  "eliteMoves": [ "FRENZY_PLANT" ]
}
```

We have this typed under 
[src/entities/pokedex/types.ts](src/entities/pokedex/types.ts) as:

```ts
export type PokedexEntry = {
  dex: number
  speciesName: string
  speciesId: string
  baseStats: Stats,
  types: SpeciesTypes,
  fastMoves: string[],
  chargedMoves: string[],
  legacyMoves: string[],
  tags: string[]
}
```

It looks like pvpoke has renamed legacyMoves to eliteMoves since this was done,
which makes more sense. Also the `shadow` tag has been renamed `shadoweligible`. 
We are currently ignoring the `defaultIVs` and `level25CP` properties, as they 
can be calculated and/or cached elsewhere. 

The pokedex is exported for use by other code here:

[src/entities/pokedex/index.ts](src/entities/pokedex/index.ts)

This file does a TypeScript JSON import

It exports a function `getPokedex` to get the whole dex in one go - it returns
this as a readonly array (only enforced in TypeScript, not at runtime!)

It also loops over the dex once and creates some caches, ID -> pokedex
entry and ID -> isShadowEligible

These caches can be accessed through the exported functions 
`getPokedexEntryById` and `isShadowPokemon`

#### TODO

- rename `legacyMoves` -> `eliteMoves`
- where we check for `shadow` tag, check for `shadoweligible` instead
- should `getPokedex` and `getPokemonById` return clones so that the end 
  consumer doesn't inadvertantly mutate pokdex entries?

### gamemaster.moves

This array contains both fast and charge moves and looks like this in the raw 
data:

```json
{
  "moveId": "ACID",
  "name": "Acid",
  "type": "poison",
  "power": 6,
  "energy": 0,
  "energyGain": 5,
  "cooldown": 1000
},
{
  "moveId": "ACID_SPRAY",
  "name": "Acid Spray",
  "type": "poison",
  "power": 20,
  "energy": 50,
  "energyGain": 0,
  "cooldown": 500,
  "buffs": [ 0, -2 ],
  "buffTarget": "opponent",
  "buffApplyChance": "1"
},
```

The easiest way to distinguish between the two is that fast moves have an 
`energy` of `0`
 
Charge moves can contain the optional buff properties - if one of these buff
properties appears all of them must

pvpoke for some reason uses a string for the `buffApplyChance`

We use the raw data essentially as-is except `buffApplyChance` is a number

The moves are exported for use by other code here:

[src/entities/moves/index.ts](src/entities/moves/index.ts)

It exports a function `getMoves` to get all of the moves in one go - it returns
this as a readonly array (again, only enforced in TypeScript, not at runtime)

It also loops over the moves once and creates a cache, ID -> move, and populates
three arrays with fast moves, all charged moves, and just buffed charge moves

The cache is accessible through `getMoveById`. There ìs also `getFastMoves`,
`getChargeMoves` and `getBuffedChargeMoves`

There are also some type guard functions that can narrow the type of a general
move from the moveset array down to their specific type, eg fast, charge, 
buffed:

[src/entities/moves/predicates.ts](src/entities/moves/predicates.ts)

We also have functionality to get the movepool for a pokedex entry:

[src/entities/moves/pool.ts](src/entities/moves/pool.ts)

## `src/js`

- `src/js/GameMaster.js` - almost every other useful class holds an instance of this
  - provides game data to consumers (eg pokedex and moves from `gamemaster.json`)
  - contains some util functions eg getPokemonById
  - pre-processes the game data eg updateShadowStatus
  - generates default IVs for pokemon
  - loads pre-generated ranking results from the `data` folder
  - the implementation of search (eg "dragon&!flying" )

### `/src/js/battle/`

- `/src/js/battle/Battle.js` - contains the class that handles all the work for running
  battles. Allows you to set up a battle, start the battle, run through the 
  battle one step at a time etc

- `/src/js/battle/Rank*.js` and `/src/js/TeamRanker.js` - a whole bunch of classes for 
  ranking pokemon in different ways - I'm not even sure that they're all used?

- `src/js/battle/TimelineAction.js` - stores data about an action for a single turn in 
  battle

- `src/js/battle/TimelineEvent.js` - like a cutdown version of `TimelineAction` - not
  actually used in the code

### `src/js/interface`

Everything here is client side javascript for the browser - not interesting to
us but worth picking through to see if any useful algorithms ended up in here

### `src/js/libs`

Just jQuery

### `src/js/pokemon`

- `/src/js/pokemon/player.js` - a class for setting up a player for battle
- `/src/js/pokemon/pokemon.js` - a class for setting up a pokemon for battle

### `src/js/training`

I haven't looked too closely into this part of the source but for the most part 
it appears to contains AI for running battles against a computer opponent - the
useful parts of this code are mostly algorithmic but in places tied into the 
front end browser javascript as well

