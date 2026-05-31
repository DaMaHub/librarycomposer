'use strict'
/**
*  Prepare Peer Contracts
*
*
* @class PeerComposer
* @package    HOP health
* @copyright  Copyright (c) 2025 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import PeerContract from '../contracttemplate/peerContract.js'
import events from 'events'

class PeerComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.livePeerContracts = new PeerContract(this.heliLive)
  }

  /**
  * prepare an individual peer
  * @method peerPrepare
  *
  */
  peerPrepare(peerFix, inPeer) {
    try {
      const peerContract = this.livePeerContracts.PeerContractform(inPeer)
      
      // 2. Generate the raw 32-byte hash of this relationship record
      const peerHASH = this.cryptoLive.createKey(peerContract)


      // 4. Create the permanent Content Key: peer![peerHASH]
      const peerContentKey = this.cryptoLive.createPrefixedKey(peerFix, peerHASH)
      
      return {
        hash: peerContentKey, // Use this to save the core contract profile
        contract: peerContract
      }

    } catch (error) {
      console.error('Validation Error in cuesPrepare:', error.message)
      throw error
    }

  }

  /**
  * update contract for latest timestamp
  * @method peerTimestamp
  *
  */
  peerTimestamp(peerUpdate) {
    let peerReady = {}
    peerReady.peerid = peerUpdate.key
    peerReady.data = peerUpdate.value
    return peerReady
  }

  /**
  * prepare update relationships with peer
  * @method peerRelationships
  *
  */
  peerRelationships(peerUpdate) {
    let relContract = this.livePeerContracts.relationshipsBuilder(peerUpdate.data.contract, peerUpdate.data.relationships)
    let peerReady = {}
    const peerHASH = peerUpdate.data.contract.key
    peerReady.peerid = peerHASH
    peerReady.data = relContract.value
    return peerReady
  }
}

export default PeerComposer
