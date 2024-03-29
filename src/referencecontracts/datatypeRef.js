'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class DatatypeReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var DatatypeReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(DatatypeReferenceContract, events.EventEmitter)

/**
* prepare a datatype reference contract
* @method dataTypePrepare
*
*/
DatatypeReferenceContract.prototype.dataTypePrepare = function (inputRC) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'datatype'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'library'
  RefContractHolder.reftype = 'datatype'
  RefContractHolder.action = 'PUT'
  let contractData = {}
  contractData.hash = dtHASH
  contractData.contract = datatypeReferenceContract
  RefContractHolder.data = contractData
  return RefContractHolder
}

export default DatatypeReferenceContract
