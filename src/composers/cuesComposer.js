'use strict'
/**
*  Prepare Cues Contracts
*
*
* @class CuesComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import CuesContract from '../contracttemplate/cuesContract.js'
import util from 'util'
import events, { captureRejectionSymbol } from 'events'

var CuesComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.liveCuesContracts = new CuesContract()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(CuesComposer, events.EventEmitter)

/**
* prepare and indiviual cue
* @method cuesPrepare
*
*/
CuesComposer.prototype.cuesPrepare = function (inCue) {
  let cueContract = this.liveCuesContracts.cuesContractform(inCue.data)
  let cueReady = {}
  const cueHASH = this.cryptoLive.evidenceProof(cueContract)
  cueReady.cueid = cueHASH
  cueReady.data = cueContract
  return cueReady
}

/**
* update contract for latest timestamp
* @method cuesTimestamp
*
*/
CuesComposer.prototype.cuesTimestamp = function (cueUpdate) {
  let cueReady = {}
  cueReady.cueid = cueUpdate.key
  cueReady.data = cueUpdate.value
  return cueReady
}

/**
* prepare update relationships with cue
* @method cuesRelationships
*
*/
CuesComposer.prototype.cuesRelationships = function (cueUpdate) {
  let relContract = this.liveCuesContracts.relationshipsBuilder(cueUpdate.data.contract, cueUpdate.data.relationships)
  let cueReady = {}
  const cueHASH = cueUpdate.data.contract.key
  cueReady.cueid = cueHASH
  cueReady.data = relContract.value
  return cueReady
}

export default CuesComposer