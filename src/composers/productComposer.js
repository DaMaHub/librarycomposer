'use strict'
/**
*  Prepare media Contracts
*
*
* @class ProductComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import productContract from '../contracttemplate/productContract.js'
import events from 'events'

class ProductComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliclock
    this.liveproductContracts = new productContract(this.heliLive)
  }

  /**
  * prepare and indiviual cue
  * @method productPrepare
  *
  */
  productPrepare(pData) {
    try {
      let reContract = this.liveproductContracts.productContractform(pData.data)
      const cueHASH = this.cryptoLive.createKey(reContract)
      let reReady = {}
      reReady.cueid = this.cryptoLive.createPrefixedKey('product', cueHASH)
      reReady.data = reContract
      return reReady
    } catch (error) {
      console.error('Validation Error in productPrepare:', error.message)
      throw error
    }
  }

  /**
  * prepare and indiviual cue
  * @method productRelationships
  *
  */
  productRelationships() {
    let relContract = {}
    return relContract
  }
}

export default ProductComposer