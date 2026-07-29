'use strict'
/**
*  Prepare Overlay Contracts
*
*
* @class OverlayComposer
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import OverlayRef from '../referencecontracts/overlayRef.js'
import events from 'events'

class OverlayComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveOverlayContracts = new OverlayRef(this.heliLive)
  }

  /**
  * prepare an individual Overlay
  * @method OverlayPrepare
  *
  */
  overlayPrepare(inOverlay) {
    try {
      let OverlayContract = this.liveOverlayContracts.overlayForm(inOverlay)
      console.log('contract forme overlay')
      console.log(OverlayContract)
      let OverlayReady = {}
      const OverlayHASH = this.cryptoLive.createKey(OverlayContract)
      OverlayReady.hash = this.cryptoLive.createPrefixedKey('Overlay', OverlayHASH)
      OverlayReady.contract = OverlayContract
      return OverlayReady
    } catch (error) {
      console.error('Validation Error in OverlayPrepare:', error.message)
      throw error
    }
  }
}

export default OverlayComposer