'use strict'
/**
*  Prepare Lensglue Contracts
*
*
* @class LensglueComposer
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import LensglueRef from '../referencecontracts/lensglueRef.js'
import events from 'events'

class LensglueComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveLensglueContracts = new LensglueRef(this.heliLive)
  }

  /**
  * prepare and individual lensglue
  * @method lensgluePrepare
  *
  */
  lensgluePrepare(lsKey, inLensglue) {
    try {
      let lensglueContract = this.liveLensglueContracts.lensgluePrepare(inLensglue)

      // 1. Create the raw 32-byte hash
      const keyHASH = this.cryptoLive.createKey(lensglueContract)

      let lensglueReady = {}
      // const lensglueHASH = this.cryptoLive.createKey(lensglueContract)
      const stitchKey = this.cryptoLive.createStitchKey(lsKey, keyHASH)

      const cueContentKey = this.cryptoLive.createContentKey('cues', cueHASH)
      
      return {
        hash: stitchKey,
        contentKey: cueContentKey,
        contract: cueContract
      }
    } catch (error) {
      console.error('Validation Error in lensgluePrepare:', error.message)
      throw error
    }
  }
}

export default LensglueComposer
