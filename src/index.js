'use strict'
import CuesComposer from './composers/cuesComposer.js'
import ModelComposer from './composers/modelComposer.js'
import MediaComposer from './composers/mediaComposer.js'
import ResearchComposer from './composers/researchComposer.js'
import MarkerComposer from './composers/markerComposer.js'
import ProductComposer from './composers/productComposer.js'
import RcComposer from './composers/rcComposer.js'
import KbidComposer from './composers/kbidComposer.js'
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
  this.liveCues = new CuesComposer()
  this.liveModel = new ModelComposer()
  this.liveMedia = new MediaComposer()
  this.liveResearch = new ResearchComposer()
  this.liveMarker = new MarkerComposer()
  this.liveProduct = new ProductComposer()
  this.liveComposer = new RcComposer()
  this.liveKBID = new KbidComposer()
  this.liveRefcontUtility = new RcUtility()
  this.liveCryptoUtilty = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(LibraryLib, events.EventEmitter)

export default LibraryLib
