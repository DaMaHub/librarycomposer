'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class PackagingReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var VisualiseReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(VisualiseReferenceContract, events.EventEmitter)

/**
* prepare a datatype reference contract
* @method visualisePrepare
*
*/
VisualiseReferenceContract.prototype.visualisePrepare = function (inputRC) {
  const visualiseReferenceContract = {}
  visualiseReferenceContract.refcontract = 'visualise'
  visualiseReferenceContract.concept = {}
  // prepare semantic part of datatype ref contracts
  visualiseReferenceContract.computational = inputRC
  return visualiseReferenceContract
}

export default VisualiseReferenceContract
