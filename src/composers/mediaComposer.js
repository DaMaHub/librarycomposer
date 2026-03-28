'use strict'
/**
*  Prepare media Contracts
*
*
* @class MediaComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import mediaContract from '../contracttemplate/mediaContract.js'
import events from 'events'

class MediaComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.livemediaContracts = new mediaContract(this.heliLive)
  }

  /**
  * prepare and indiviual cue
  * @method mediaPrepare
  *
  */
  mediaPrepare(data) {
    try {
      let mediaContract = this.livemediaContracts.mediaContractform(data)
      const cueHASH = this.cryptoLive.createKey(mediaContract)
      let reReady = {}
      reReady.cueid = this.cryptoLive.createPrefixedKey('media', cueHASH)
      reReady.data = mediaContract
      return reReady
    } catch (error) {
      console.error('Validation Error in mediaPrepare:', error.message)
      throw error
    }
  }

  /**
  * prepare and indiviual cue
  * @method mediaRelationships
  *
  */
  mediaRelationships() {
    let relContract = {}
    return relContract
  }
}

export default MediaComposer