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
import CryptoUtility from './cryptoUtility.js'
import DatatypeRefCont from './referencecontracts/datatypeRef.js'
import PackagingRefCont from './referencecontracts/packagingRef.js'
import ComputeRefCont from './referencecontracts/computeRef.js'
import VisualiseRefCont from './referencecontracts/visualiseRef.js'
import ModulueRefCont from './referencecontracts/moduleRef.js'
import ExperimentRefCont from './referencecontracts/experimentRef.js'
// const util = require('util')
// const events = require('events')
import util from 'util'
import events from 'events'

var ReferenceContractComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
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
* Datatype composer
* @method datatypeComposer
*
*/
ReferenceContractComposer.prototype.datatypeComposer = function (input) {
  const preContract = this.datatypeRefLive.dataTypePrepare(input)
  return preContract
}

/**
* Packaging composer
* @method packagingComposer
*
*/
ReferenceContractComposer.prototype.packagingComposer = function (input) {
  const preContract = this.packagingRefLive.packagingPrepare(input)
  return preContract
}

/**
* Compute composer
* @method computeComposer
*
*/
ReferenceContractComposer.prototype.computeComposer = function (input) {
  const preContract = this.computeRefLive.computePrepare(input)
  return preContract
}

/**
* Visualise composer
* @method visualiseComposer
*
*/
ReferenceContractComposer.prototype.visualiseComposer = function (input) {
  const preContract = this.visualiseRefLive.visualisePrepare(input)
  return preContract
}

/**
* moduleComposer composer
* @method moduleComposer
*
*/
ReferenceContractComposer.prototype.moduleComposer = function (input, join) {
  let preContract = {}
  if (join === 'join') {
    preContract = this.moduleRefLive.moduleJoinPrepare(input)
  } else if (join === 'update') {
    preContract = this.moduleRefLive.moduleUpdatePrepare(input)
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
ReferenceContractComposer.prototype.experimentComposerJoin = function (input) {
  const preContract = this.experimentRefLive.nxpJoinedPrepare(input)
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
