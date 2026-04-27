'use strict'
/**
*  Prepare Gelle Contracts
*
*
* @class GelleComposer
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import GelleRef from '../referencecontracts/gelleRef.js'
import events from 'events'

class GelleComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveGelleContracts = new GelleRef(this.heliLive)
  }

  /**
  * prepare and individual gelle
  * @method gellePrepare
  *
  */
  gellePrepare(inGelle) {
    try {
      let gelleContract = this.liveGelleContracts.gellePrepare(inGelle)
      let gelleReady = {}
      const gelleHASH = this.cryptoLive.createKey(gelleContract)
      gelleReady.id = this.cryptoLive.createPrefixedKey('gelle', gelleHASH)
      gelleReady.data = gelleContract
      return gelleReady
    } catch (error) {
      console.error('Validation Error in gellePrepare:', error.message)
      throw error
    }
  }
}

export default GelleComposer
