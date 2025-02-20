'use strict'
/**
*  Prepare Research Contracts
*
*
* @class ResearchContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var ResearchContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()

}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ResearchContract, events.EventEmitter)

/**
* prepare and indiviual cue
* @method researchContractform
*
*/
ResearchContract.prototype.researchContractform = function (inRe) {
  let researchContract = {}
  researchContract.refcontract = 'research'
  researchContract.concept = {}
  researchContract.space = {}
  researchContract.computational = {}
  // prepare semantic part of datatype ref contracts
  researchContract.concept = inRe
  // prepare space coordinates e.g. quark, atom, molecule etc.
  researchContract.space = { concept: 'mind' }
  return researchContract
}

/**
* prepare and indiviual 
* @method ResearchRelationships
*
*/
ResearchContract.prototype.relationshipsBuilder = function () {

}

export default ResearchContract