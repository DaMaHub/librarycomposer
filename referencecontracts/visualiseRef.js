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
const util = require('util')
const events = require('events')

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
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(visualiseReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'visualise'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = visualiseReferenceContract
  return RefContractHolder
}

export default VisualiseReferenceContract
