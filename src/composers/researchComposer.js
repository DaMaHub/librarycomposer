'use strict'
/**
*  Prepare media Contracts
*
*
* @class ResearchComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import researchContract from '../contracttemplate/researchContract.js'
import events from 'events'

class ResearchComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveresearchContracts = new researchContract(this.heliLive)
  }

  /**
  * prepare and indiviual cue
  * @method researchPrepare
  *
  */
  researchPrepare(rData) {
    try {
      let reContract = this.liveresearchContracts.researchContractform(rData.data)
      const cueHASH = this.cryptoLive.createKey(reContract)
      let reReady = {}
      reReady.cueid = this.cryptoLive.createPrefixedKey('research', cueHASH)
      reReady.data = reContract
      return reReady
    } catch (error) {
      console.error('Validation Error in researchPrepare:', error.message)
      throw error
    }
  }

  /**
  * prepare and indiviual cue
  * @method mediaRelationships
  *
  */
  researchRelationships() {
    let relContract = {}
    return relContract
  }
}

export default ResearchComposer