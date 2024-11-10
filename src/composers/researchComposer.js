'use strict'
/**
*  Prepare media Contracts
*
*
* @class ResearchComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import researchContract from '../contracttemplate/researchContract.js'
import util from 'util'
import events from 'events'

var ResearchComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.liveresearchContracts = new researchContract()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ResearchComposer, events.EventEmitter)

/**
* prepare and indiviual cue
* @method researchPrepare
*
*/
ResearchComposer.prototype.researchPrepare = function (rData) {
  let reContract = this.liveresearchContracts.researchContractform(rData.data)
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
ResearchComposer.prototype.researchRelationships = function () {
  let relContract = {}
  return relContract
}

export default ResearchComposer