'use strict'
/**
*  Prepare media Contracts
*
*
* @class MarkerComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import markerContract from '../contracttemplate/markerContract.js'
import events from 'events'

class MarkerComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.livemarkerContracts = new markerContract(this.heliLive)
  }

  /**
  * prepare and indiviual cue
  * @method MarkerComposer
  *
  */
  markerPrepare(rData) {
    try {
      let reContract = this.livemarkerContracts.markerContractform(rData.data)
      const cueHASH = this.cryptoLive.createKey(reContract)
      let reReady = {}
      reReady.cueid = this.cryptoLive.createPrefixedKey('marker', cueHASH)
      reReady.data = reContract
      return reReady
    } catch (error) {
      console.error('Validation Error in markerPrepare:', error.message)
      throw error
    }
  }

  /**
  * prepare and indiviual cue
  * @method mediaRelationships
  *
  */
  markerRelationships() {
    let relContract = {}
    return relContract
  }
}

export default MarkerComposer