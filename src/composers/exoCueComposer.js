'use strict'
/**
*  Prepare ExoCue Contracts
*
*
* @class ExoCueComposer
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import ExoCueRef from '../referencecontracts/exoCueRef.js'
import events from 'events'

class ExoCueComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveExoCueContracts = new ExoCueRef(this.heliLive)
  }

  /**
  * prepare an individual exoCue
  * @method exoCuePrepare
  *
  */
  exoCuePrepare(inExoCue) {
    try {
      let exoCueContract = this.liveExoCueContracts.exoCuePrepare(inExoCue)
      let exoCueReady = {}
      const exoCueHASH = this.cryptoLive.createKey(exoCueContract)
      exoCueReady.id = this.cryptoLive.createPrefixedKey('exocue', exoCueHASH)
      exoCueReady.data = exoCueContract
      return exoCueReady
    } catch (error) {
      console.error('Validation Error in exoCuePrepare:', error.message)
      throw error
    }
  }
}

export default ExoCueComposer