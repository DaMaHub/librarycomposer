'use strict'
/**
*  Prepare Media Contracts
*
*
* @class MediaContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var MediaContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()

}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(MediaContract, events.EventEmitter)

/**
* prepare and indiviual cue
* @method mediaContractform
*
*/
MediaContract.prototype.mediaContractform = function (medIn) {
  console.log(' from medai form')
  console.log(medIn)
  let cueContract = {}
  cueContract.refcontract = 'media'
  cueContract.concept = {}
  cueContract.space = {}
  cueContract.computational = {}
  // prepare semantic part of datatype ref contracts
  cueContract.concept = medIn
  // prepare space coordinates e.g. quark, atom, molecule etc.
  cueContract.space = { concept: 'mind' }
  return cueContract
}

/**
* prepare and indiviual 
* @method mediaRelationships
*
*/
MediaContract.prototype.mediaRelationships = function () {

}

export default MediaContract