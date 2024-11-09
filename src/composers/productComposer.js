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
import mediaContract from '../contracttemplate/mediaContract.js'
import util from 'util'
import events from 'events'

var ProductComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.livemediaContracts = new mediaContract()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ProductComposer, events.EventEmitter)

/**
* prepare and indiviual cue
* @method mediaPrepare
*
*/
ProductComposer.prototype.productPrepare = function () {
  console.log('parepare prodcut contract please')
  let cueContract = this.livemediaContracts.mediaContractform()
  return cueContract
}

/**
* prepare and indiviual cue
* @method mediaRelationships
*
*/
ProductComposer.prototype.productRelationships = function () {
  let relContract = {}
  return relContract
}

export default ProductComposer