'use strict'
/**
*  Prepare Knowledge Bundle Entry
*
*
* @class KbidComposer
* @package    Network Library
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from './cryptoUtility.js'
import KbidEntry from './kbids/KBIDentry.js'
const util = require('util')
const events = require('events')

var KbidComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.entryLive = new KbidEntry()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(KbidComposer, events.EventEmitter)

/**
* A new template entry set per experiment
* @method kbidTemplateNew
*
*/
KbidComposer.prototype.kbidTemplateNew = function (input) {
  console.log('prepare New KBID template entry')
  const templateEntry = this.entryLive.prepareKBIDtemplate(input)
  return templateEntry
}

/**
* a peer knowledge bundle entry
* @method kbidEntry
*
*/
KbidComposer.prototype.kbidEntry = function (input) {
  console.log('prepare KBID entry')
  const kbidEntry = this.entryLive.prepareKBIDentry(input)
  return kbidEntry
}

export default KbidComposer
