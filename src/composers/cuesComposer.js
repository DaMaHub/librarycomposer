'use strict'
/**
*  Prepare Cues Contracts
*
*
* @class CuesComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CuesContract from '../contracttemplate/cuesContract.js'
import events from 'events'

class CuesComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveCuesContracts = new CuesContract(this.heliLive)
  }

  /**
  * prepare and indiviual cue
  * @method cuesPrepare
  *
  */
  cueComposer(lsKey, inCue) {
    console.log('cue cmopser start')
    try {
      const cueContract = this.liveCuesContracts.cuesContractform(inCue)
      
      // 1. Create the raw 32-byte hash
      const cueHASH = this.cryptoLive.createKey(cueContract)

      // 3. Create the Stitch Key
      // By passing the cleanLSID (hex) and cueHASH (binary) to your utility,
      // the utility can now form a clean [HEX]!link![HEX] key.
      const stitchKey = this.cryptoLive.createStitchKey(lsKey, cueHASH)
      
      const cueContentKey = this.cryptoLive.createContentKey('cues', cueHASH)
      
      return {
        hash: stitchKey,
        contentKey: cueContentKey,
        contract: cueContract
      }
    } catch (error) {
      console.error('Validation Error in cuesPrepare:', error.message)
      throw error
    }
  }

  /**
  * update contract for latest timestamp
  * @method cuesTimestamp
  *
  */
  cuesTimestamp(cueUpdate) {
    let cueReady = {}
    cueReady.cueid = cueUpdate.key
    cueReady.data = cueUpdate.value
    return cueReady
  }

  /**
  * prepare update relationships with cue
  * @method cuesRelationships
  *
  */
  cuesRelationships(cueUpdate) {
    let relContract = this.liveCuesContracts.relationshipsBuilder(cueUpdate.data.contract, cueUpdate.data.relationships)
    let cueReady = {}
    const cueHASH = cueUpdate.data.contract.key
    cueReady.cueid = cueHASH
    cueReady.data = relContract.value
    return cueReady
  }
}

export default CuesComposer