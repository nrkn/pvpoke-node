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

