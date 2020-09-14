'use strict'
/**
*  Prepare Knwowledge Bundle Entry
*
*
* @class KBID
* @package    Network Library
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var KBID = function () {
  events.EventEmitter.call(this)
  console.log('KBID live')
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(KBID, events.EventEmitter)

/**
* knowledge bundle template entry
* @method prepareKBIDtemplate
*
*/
KBID.prototype.prepareKBIDtemplate = function (inputRC) {
  console.log('KBID template')
  return true
}

/**
*
* @method prepareKBIDentry
*
*/
KBID.prototype.prepareKBIDentry = function (inputRC) {
  console.log('KIB ENTRY')
  return true
}

export default KBID
