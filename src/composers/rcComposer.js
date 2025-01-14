'use strict'
/**
*  Prepare Reference Contracts
*
*
* @class ReferenceContractComposer
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import LifeboardRefCont from '../referencecontracts/lifeboardRef.js'
import QuestionRefCont from '../referencecontracts/questionRef.js'
import DatatypeRefCont from '../referencecontracts/datatypeRef.js'
import PackagingRefCont from '../referencecontracts/packagingRef.js'
import ComputeRefCont from '../referencecontracts/computeRef.js'
import VisualiseRefCont from '../referencecontracts/visualiseRef.js'
import ModulueRefCont from '../referencecontracts/moduleRef.js'
import ExperimentRefCont from '../referencecontracts/experimentRef.js'
// const util = require('util')
// const events = require('events')
import util from 'util'
import events from 'events'

var ReferenceContractComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.lifeboardRefLive = new LifeboardRefCont()
  this.questionRefLive = new QuestionRefCont()
  this.datatypeRefLive = new DatatypeRefCont()
  this.packagingRefLive = new PackagingRefCont()
  this.computeRefLive = new ComputeRefCont()
  this.visualiseRefLive = new VisualiseRefCont()
  this.moduleRefLive = new ModulueRefCont()
  this.experimentRefLive = new ExperimentRefCont()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ReferenceContractComposer, events.EventEmitter)

/**
* Lifeboard composer
* @method lifeboardComposer
*
*/
ReferenceContractComposer.prototype.lifeboardComposer = function (input, type) {
  let preContract = {}
  if (type === 'new') {
    preContract = this.lifeboardRefLive.lifeboardPrepare(input)
  } else if (type === 'member') {
    preContract = this.lifeboardRefLive.lbmemberPrepare(input)
  }
  return preContract
}

/**
* question composer
* @method questionComposer
*
*/
ReferenceContractComposer.prototype.questionComposer = function (input) {
  const prepContract = this.questionRefLive.questionPrepare(input)
    // create a hash of entries as the index key
    const dtHASH = this.cryptoLive.evidenceProof(prepContract)
    const RefContractHolder = {}
    RefContractHolder.type = 'library'
    RefContractHolder.action = 'contracts'
    RefContractHolder.privacy = 'public'
    RefContractHolder.reftype = 'datatype'
    RefContractHolder.task = 'PUT'
    let contractData = {}
    contractData.hash = dtHASH
    contractData.contract = prepContract
    RefContractHolder.data = contractData
  return RefContractHolder
}

/**
* Datatype composer
* @method datatypeComposer
*
*/
ReferenceContractComposer.prototype.datatypeComposer = function (input) {
  const prepContract = this.datatypeRefLive.dataTypePrepare(input)
    // create a hash of entries as the index key
    const dtHASH = this.cryptoLive.evidenceProof(prepContract)
    const RefContractHolder = {}
    RefContractHolder.type = 'library'
    RefContractHolder.action = 'contracts'
    RefContractHolder.privacy = 'public'
    RefContractHolder.reftype = 'datatype'
    RefContractHolder.task = 'PUT'
    let contractData = {}
    contractData.hash = dtHASH
    contractData.contract = prepContract
    RefContractHolder.data = contractData
    console.log('wdududud')
    console.log(RefContractHolder)
  return RefContractHolder
}

/**
* Packaging composer
* @method packagingComposer
*
*/
ReferenceContractComposer.prototype.packagingComposer = function (input) {
  // check if genesis or join
  const prepContract = this.packagingRefLive.packagingPrepare(input)
  const dtHASH = this.cryptoLive.evidenceProof(prepContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'library'
  RefContractHolder.action = 'contracts'
  RefContractHolder.privacy = 'public'
  RefContractHolder.reftype = 'packaging'
  RefContractHolder.task = 'PUT'
  let contractData = {}
  contractData.hash = dtHASH
  contractData.contract = prepContract
  RefContractHolder.data = contractData
  return RefContractHolder
}

/**
* Compute composer
* @method computeComposer
*
*/
ReferenceContractComposer.prototype.computeComposer = function (input) {
  const prepContract = this.computeRefLive.computePrepare(input)
  const dtHASH = this.cryptoLive.evidenceProof(prepContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'library'
  RefContractHolder.action = 'contracts'
  RefContractHolder.privacy = 'public'
  RefContractHolder.reftype = 'compute'
  RefContractHolder.task = 'PUT'
  let contractData = {}
  contractData.hash = dtHASH
  contractData.contract = prepContract
  RefContractHolder.data = contractData
  return RefContractHolder
}

/**
* Visualise composer
* @method visualiseComposer
*
*/
ReferenceContractComposer.prototype.visualiseComposer = function (input) {
  const prepContract = this.visualiseRefLive.visualisePrepare(input)
  const dtHASH = this.cryptoLive.evidenceProof(prepContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'library'
  RefContractHolder.action = 'contracts'
  RefContractHolder.privacy = 'public'
  RefContractHolder.reftype = 'visualise'
  RefContractHolder.task = 'PUT'
  let contractData = {}
  contractData.hash = dtHASH
  contractData.contract = prepContract
  RefContractHolder.data = contractData
  return RefContractHolder
}

/**
* moduleComposer composer
* @method moduleComposer
*
*/
ReferenceContractComposer.prototype.moduleComposer = function (input, action) {
  let preContract = {}
  if (action === 'join') {
    preContract = this.moduleRefLive.moduleJoinPrepare(input)
  } else if (action === 'update') {
    preContract = this.moduleRefLive.moduleUpdatePrepare(input)
  } else if (action === 'temp') {
    preContract = this.moduleRefLive.moduleGenesisTemp(input)
  } else {
    preContract = this.moduleRefLive.moduleGenesisPrepare(input)
  }
  return preContract
}

/**
* Experiment composer
* @method experimentComposerGenesis
*
*/
ReferenceContractComposer.prototype.experimentComposerGenesis = function (input) {
  const preContract = this.experimentRefLive.nxpPrepare(input)
  return preContract
}

/**
* Experiment composer
* @method experimentComposerJoin
*
*/
ReferenceContractComposer.prototype.experimentComposerJoin = function (genkey, input) {
  const preContract = this.experimentRefLive.nxpJoinedPrepare(genkey, input)
  return preContract
}

/**
* match contract id to ref contract
* @method refcontractLookup
*
*/
ReferenceContractComposer.prototype.refcontractLookup = function (refCont, allContracts) {
  let matchKey = {}
  for (const rc of allContracts) {
    if (refCont.trim() === rc.key) {
      matchKey = rc
    }
  }
  return matchKey
}

export default ReferenceContractComposer