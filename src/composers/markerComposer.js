'use strict'
/**
*  Prepare media Contracts
*
*
* @class MarkerComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import markerContract from '../contracttemplate/markerContract.js'
import util from 'util'
import events from 'events'

var MarkerComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.livemarkerContracts = new markerContract()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(MarkerComposer, events.EventEmitter)

/**
* prepare and indiviual cue
* @method MarkerComposer
*
*/
MarkerComposer.prototype.markerPrepare = function (rData) {
  let reContract = this.livemarkerContracts.markerContractform(rData.data)
  const cueHASH = this.cryptoLive.evidenceProof(reContract)
  let reReady = {}
  reReady.cueid = cueHASH
  reReady.data = reContract
  return reReady
}

/**
* prepare and indiviual cue
* @method mediaRelationships
*
*/
MarkerComposer.prototype.markerRelationships = function () {
  let relContract = {}
  return relContract
}

export default MarkerComposer