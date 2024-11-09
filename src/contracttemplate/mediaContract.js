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
MediaContract.prototype.mediaContractform = function (formInput) {
  console.log('parddfdfdfdfepare media contract please')
  const mediaContract = {}  
  mediaContract.refcontract = 'packaging'
  mediaContract.concept = {}
  mediaContract.space = {}
  mediaContract.computational = {}
  mediaContract.concept = formInput
  mediaContract.space = { concept: 'mind' }
  mediaContract.computational = { refcontract: null }
}

/**
* prepare and indiviual 
* @method mediaRelationships
*
*/
MediaContract.prototype.relationshipsBuilder = function () {

}

export default MediaContract