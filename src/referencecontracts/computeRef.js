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

var ComputeReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ComputeReferenceContract, events.EventEmitter)

/**
* prepare a datatype reference contract
* @method dataTypePrepare
*
*/
ComputeReferenceContract.prototype.computePrepare = function (inputRC) {
  const computeReferenceContract = {}
  computeReferenceContract.refcontract = 'compute'
  computeReferenceContract.concept = {}
  // prepare semantic part of datatype ref contracts
  computeReferenceContract.computational = inputRC
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(computeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'library'
  RefContractHolder.reftype = 'compute'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = computeReferenceContract
  return RefContractHolder
}

export default ComputeReferenceContract
