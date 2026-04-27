'use strict'
/**
*  Prepare Orgo Contracts
*
*
* @class OrgoComposer
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import OrgoRef from '../referencecontracts/orgoRef.js'
import events from 'events'

class OrgoComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveOrgoContracts = new OrgoRef(this.heliLive)
  }

  /**
  * prepare and individual orgo
  * @method orgoPrepare
  *
  */
  orgoPrepare(inOrgo) {
    try {
      let orgoContract = this.liveOrgoContracts.orgoPrepare(inOrgo)
      let orgoReady = {}
      const orgoHASH = this.cryptoLive.createKey(orgoContract)
      orgoReady.id = this.cryptoLive.createPrefixedKey('orgo', orgoHASH)
      orgoReady.data = orgoContract
      return orgoReady
    } catch (error) {
      console.error('Validation Error in orgoPrepare:', error.message)
      throw error
    }
  }
}

export default OrgoComposer
