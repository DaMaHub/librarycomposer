'use strict'
/**
*  Prepare Cues Contract
*
*
* @class CuesContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var CuesContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()

}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(CuesContract, events.EventEmitter)

/**
* prepare and indiviual cue
* @method cuesContractform
*
*/
CuesContract.prototype.cuesContractform = function (inCue) {
  let cueContract = {}
  cueContract.refcontract = 'cue'
  cueContract.concept = {}
  cueContract.space = {}
  cueContract.computational = {}
  // prepare semantic part of datatype ref contracts
  cueContract.concept = inCue.concept
  // relationships with cue
  cueContract.computational = inCue.computational

  cueContract.space = { concept: 'mind' }
  return cueContract
}

/**
* prepare and indiviual cue
* @method cuesRelationships
*
*/
CuesContract.prototype.relationshipsBuilder = function (cueContract, updateRels) {
  cueContract.value.computational.relationships = updateRels
  return cueContract
}

export default CuesContract