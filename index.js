'use strict'
import RcComposer from './rcComposer.js'
import KbidComposer from './kbidComposer.js'
import RcUtility from './rcUtility.js'
import CryptoUtility from './cryptoUtility.js'
/**
*  Interface to reference contract libraries
*
*
* @class LibraryLib
* @package    Network Library
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import util from 'util'
import events from 'events'

var LibraryLib = function () {
  events.EventEmitter.call(this)
  console.log('ref contract composer live')
  this.liveComposer = new RcComposer()
  this.liveKBID = new KbidComposer()
  this.liveLibraryLib = new RcUtility()
  this.liveCryptoUtilty = new CryptoUtility()

}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(LibraryLib, events.EventEmitter)

export default LibraryLib
