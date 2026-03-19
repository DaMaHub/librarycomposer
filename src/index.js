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

class LibraryLib extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    if (!contextAgent || !contextAgent.crypto || !contextAgent.heliclock) {
      throw new Error('contextAgent with crypto and heliclock properties is required')
    }
    this.liveCues = new CuesComposer(contextAgent)
    this.liveModel = new ModelComposer(contextAgent)
    this.liveMedia = new MediaComposer(contextAgent)
    this.liveResearch = new ResearchComposer(contextAgent)
    this.liveMarker = new MarkerComposer(contextAgent)
    this.liveProduct = new ProductComposer(contextAgent)
    this.liveComposer = new RcComposer(contextAgent)
    this.liveKBID = new KbidComposer(contextAgent)
    this.liveRefcontUtility = new RcUtility(contextAgent)
  }
}

export default LibraryLib
