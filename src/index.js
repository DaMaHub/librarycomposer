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
import EventEmitter from 'events'

class LibraryComposer extends EventEmitter {

  constructor(contextAgents) {
    super()
    console.log('library composerLIVE')
    if (!contextAgents || !contextAgents.crypto || !contextAgents.heliclock) {
      throw new Error('contextAgent with crypto and heliclock properties is required')
    }
    this.liveCues = new CuesComposer(contextAgents)
    this.liveModel = new ModelComposer(contextAgents)
    this.liveMedia = new MediaComposer(contextAgents)
    this.liveResearch = new ResearchComposer(contextAgents)
    this.liveMarker = new MarkerComposer(contextAgents)
    this.liveProduct = new ProductComposer(contextAgents)
    this.liveComposer = new RcComposer(contextAgents)
    this.liveKBID = new KbidComposer(contextAgents)
    this.liveRefcontUtility = new RcUtility(contextAgents)
  }
}

export default LibraryComposer
