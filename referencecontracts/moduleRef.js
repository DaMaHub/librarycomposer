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

var ModuleReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ModuleReferenceContract, events.EventEmitter)

/**
* prepare a module template reference contract
* @method modulePrepare
*
*/
ModuleReferenceContract.prototype.modulePrepare = function (inputRC) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  console.log('module holder')
  console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare a module template reference contract
* @method moduleGenesisPrepare
*
*/
ModuleReferenceContract.prototype.moduleGenesisPrepare = function (inputRC) {
  let newModule = {}
  // what type of modules is it?
  if (inputRC.reftype === 'module') {
    newModule = this.prepareTemplateModule(inputRC)
  } else if (inputRC.moduleinfo.name === 'question') {
    newModule = this.prepareQuestion(inputRC)
  } else if (inputRC.moduleinfo.name === 'data') {
    newModule = this.prepareData(inputRC)
  } else if (inputRC.moduleinfo.name === 'compute') {
    newModule = this.prepareCompute(inputRC)
  } else if (inputRC.moduleinfo.name === 'visualise') {
    newModule = this.prepareVisulise(inputRC)
  } else if (inputRC.moduleinfo.name === 'education') {
    newModule = 1
  }
  return newModule
}

/**
* prepare a module template reference contract
* @method moduleJoinPrepare
*
*/
ModuleReferenceContract.prototype.moduleJoinPrepare = function (inputRC) {
  let newModule = {}
  // what type of modules is it?
  if (inputRC.reftype === 'module') {
    newModule = this.prepareJoinModule(inputRC)
  } else if (inputRC.type === 'question') {
    newModule = this.prepareJoinQuestion(inputRC)
  } else if (inputRC.type === 'data') {
    newModule = this.prepareJoinData(inputRC)
  } else if (inputRC.type === 'compute') {
    newModule = this.prepareJoinCompute(inputRC)
  } else if (inputRC.type === 'visualise') {
    newModule = this.prepareJoinVisulise(inputRC)
  } else if (inputRC.type === 'education') {
    newModule = 1
  }
  return newModule
}

/**
* prepare template module
* @method prepareTemplateModule
*
*/
ModuleReferenceContract.prototype.prepareTemplateModule = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare question module
* @method prepareQuestion
*
*/
ModuleReferenceContract.prototype.prepareQuestion = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare data module
* @method prepareData
*
*/
ModuleReferenceContract.prototype.prepareData = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

/**
* prepare compute module
* @method prepareCompute
*
*/
ModuleReferenceContract.prototype.prepareCompute = function (modIN, defaults) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare Visulise module
* @method prepareVisulise
*
*/
ModuleReferenceContract.prototype.prepareVisulise = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  // console.log('module holder')
  // console.log(RefContractHolder)
  return RefContractHolder
}

/**
* prepare Join module
* @method prepareTemplateModule
*
*/
ModuleReferenceContract.prototype.prepareJoinModule = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

/**
* prepare question module
* @method prepareQuestion
*
*/
ModuleReferenceContract.prototype.prepareJoinQuestion = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.type = modIN.type
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

/**
* prepare data module
* @method prepareData
*
*/
ModuleReferenceContract.prototype.prepareJoinData = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.type = modIN.type
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  let dataSourceSelected = {}
  dataSourceSelected.data = modIN.data.source
  datatypeReferenceContract.concept = dataSourceSelected
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

/**
* prepare compute module
* @method prepareCompute
*
*/
ModuleReferenceContract.prototype.prepareJoinCompute = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.type = modIN.type
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

/**
* prepare Visulise module
* @method prepareVisulise
*
*/
ModuleReferenceContract.prototype.prepareJoinVisulise = function (modIN) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'module'
  datatypeReferenceContract.type = modIN.type
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  datatypeReferenceContract.concept = modIN
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.reftype = 'module'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  return RefContractHolder
}

export default ModuleReferenceContract
