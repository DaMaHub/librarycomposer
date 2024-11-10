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
import CryptoUtility from '../cryptoUtility.js'
import productContract from '../contracttemplate/productContract.js'
import util from 'util'
import events from 'events'

var ProductComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.liveproductContracts = new productContract()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ProductComposer, events.EventEmitter)

/**
* prepare and indiviual cue
* @method productPrepare
*
*/
ProductComposer.prototype.productPrepare = function (pData) {
  let reContract = this.liveproductContracts.markerContractform(pData.data)
  const cueHASH = this.cryptoLive.evidenceProof(reContract)
  let reReady = {}
  reReady.cueid = cueHASH
  reReady.data = reContract
  return reReady
}

/**
* prepare and indiviual cue
* @method productRelationships
*
*/
ProductComposer.prototype.productRelationships = function () {
  let relContract = {}
  return relContract
}

export default ProductComposer