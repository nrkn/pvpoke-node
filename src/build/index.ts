import { buildDataFromUpstream } from './upstream/build-data-from-upstream'

const build = async () => {
  await buildDataFromUpstream()
}

build()
