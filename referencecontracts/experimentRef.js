'use strict'
/**
*  Prepare Experiment Reference Contracts
*
*
* @class ExperimentReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
const util = require('util')
const events = require('events')

var ExperimentReferenceContract = function () {
  events.EventEmitter.call(this)
  console.log('ref contract composer live')
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ExperimentReferenceContract, events.EventEmitter)

/**
* prepare network experiment ref contract
* @method nxpPrepare
*
*/
ExperimentReferenceContract.prototype.nxpPrepare = function (inputRC) {
  console.log('genesis experiment')
  console.log(inputRC)
  const nxpReferenceContract = {}
  nxpReferenceContract.refcontract = 'experiment'
  nxpReferenceContract.modules = {}
  nxpReferenceContract.concept = {}
  nxpReferenceContract.space = {}
  nxpReferenceContract.computational = {}
  // prepare semantic part of datatype ref contracts
  nxpReferenceContract.concept = { state: 'genesis' }
  nxpReferenceContract.modules = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  nxpReferenceContract.space = { concept: 'mind' }
  nxpReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(nxpReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'experiment'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = nxpReferenceContract
  console.log('nxp holder')
  console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare network experiment
* @method nxpJoinedPrepare
*
*/
ExperimentReferenceContract.prototype.nxpJoinedPrepare = function (inputRC) {
  const nxpReferenceContract = {}
  nxpReferenceContract.refcontract = 'experiment'
  nxpReferenceContract.modules = {}
  nxpReferenceContract.concept = {}
  nxpReferenceContract.space = {}
  nxpReferenceContract.computational = {}
  // prepare semantic part of datatype ref contracts
  nxpReferenceContract.concept = { state: 'joined' }
  nxpReferenceContract.modules = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  nxpReferenceContract.space = { concept: 'mind' }
  nxpReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(nxpReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'experiment'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = nxpReferenceContract
  console.log('nxp holder')
  console.log(RefContractHolder)
  return RefContractHolder
}

export default ExperimentReferenceContract
