'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class LifeboardContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var LifeboardContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(LifeboardContract, events.EventEmitter)

/**
* prepare a lifeboard reference contract
* @method lifeboardPrepare
*
*/
LifeboardContract.prototype.lifeboardPrepare = function (inputRC) {
  const lifeboardContract = {}
  lifeboardContract.refcontract = 'lifeboard'
  lifeboardContract.concept = {}
  lifeboardContract.space = {}
  lifeboardContract.computational = { 'routines': 'start'}
  // prepare semantic part of datatype ref contracts
  lifeboardContract.concept = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  lifeboardContract.space = { concept: 'mind' }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(lifeboardContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'lifeboard'
  RefContractHolder.reftype = 'lifeboard'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = lifeboardContract
  return RefContractHolder
}

/**
* prepare a lifeboard reference contract
* @method lifeboardPrepare
*
*/
LifeboardContract.prototype.lbmemberPrepare = function (inputRC) {
  const lifeboardContract = {}
  lifeboardContract.refcontract = 'member'
  lifeboardContract.concept = {}
  lifeboardContract.space = {}
  lifeboardContract.computational = { 'routines': 'start'}
  // prepare semantic part of datatype ref contracts
  lifeboardContract.concept = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  lifeboardContract.space = { concept: 'mind' }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(lifeboardContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'lifeboard'
  RefContractHolder.reftype = 'member'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = lifeboardContract
  return RefContractHolder
}

export default LifeboardContract
