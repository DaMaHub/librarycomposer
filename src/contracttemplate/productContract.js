'use strict'
/**
*  Prepare Product Contracts
*
*
* @class ProductContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var ProductContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()

}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ProductContract, events.EventEmitter)

/**
* prepare and indiviual cue
* @method productContractform
*
*/
ProductContract.prototype.productContractform = function (inPro) {
  let cueContract = {}
  cueContract.refcontract = 'product'
  cueContract.concept = {}
  cueContract.space = {}
  cueContract.computational = {}
  // prepare semantic part of datatype ref contracts
  cueContract.concept = inPro
  // prepare space coordinates e.g. quark, atom, molecule etc.
  cueContract.space = { concept: 'mind' }
  return cueContract
}

/**
* prepare and indiviual 
* @method ProductRelationships
*
*/
ProductContract.prototype.relationshipsBuilder = function () {

}

export default ProductContract