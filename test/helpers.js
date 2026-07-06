import { Encryption } from 'hop-crypto/encryption'
import HeliLocation from 'heliclock-hop/src/index.js'

/**
 * Helper to start a real LibraryHop instance for testing
 * @returns {Promise<LibraryHop>}
 */
export async function startRealLibraryHop() {
  // console.log('start helper')

  const encryption = new Encryption()
  encryption.Encryption = Encryption
  

  let heliLocation = new HeliLocation()
  let HeliClock = {}

  /**
   * initialize HeliClock WASM
   * @method initHeliClock
   *
  */
  let initHeliClock = async function () {
    try {
      await heliLocation.init()
      HeliClock = heliLocation.getEngine()
    } catch (err) {
      console.warn('HeliClock init failed or already initialized', err)
    }
  }

  await initHeliClock()

  let contextAgents = {
    crypto: encryption,
    network: {},
    heliclock: HeliClock,
    heliLocation: heliLocation,
  }
  return contextAgents
}
