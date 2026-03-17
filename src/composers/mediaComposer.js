'use strict'
/**
*  Prepare media Contracts
*
*
* @class MediaComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { Encryption } from 'hop-crypto/encryption'
import mediaContract from '../contracttemplate/mediaContract.js'
import util from 'util'
import events from 'events'

var MediaComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = Encryption
  this.livemediaContracts = new mediaContract()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(MediaComposer, events.EventEmitter)

/**
* prepare and indiviual cue
* @method mediaPrepare
*
*/
MediaComposer.prototype.mediaPrepare = function (data) {
  let mediaContract = this.livemediaContracts.mediaContractform(data)
  const cueHASH = this.cryptoLive.createKey(mediaContract)
  let reReady = {}
  reReady.cueid = this.cryptoLive.createPrefixedKey('media', cueHASH)
  reReady.data = mediaContract
  return reReady
}

/**
* prepare and indiviual cue
* @method mediaRelationships
*
*/
MediaComposer.prototype.mediaRelationships = function () {
  let relContract = {}
  return relContract
}

export default MediaComposer