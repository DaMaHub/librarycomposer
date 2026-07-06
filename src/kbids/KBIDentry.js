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
import util from 'util'
import events from 'events'

var KBID = function () {
  events.EventEmitter.call(this)
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
  return true
}

/**
*
* @method prepareKBIDentry
*
*/
KBID.prototype.prepareKBIDentry = function (inputRC) {
  return true
}

export default KBID
