'use strict'
/**
*  Prepare Marker Contract
*
*
* @class MarkerContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class MarkerContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare and individual marker
  * @method markerContractform
  *
  */
  markerContractform(inMa) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const markerContract = {
      refcontract: 'marker',
      concept: inMa,
      space: { concept: 'mind' },
      computational: {},
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('marker', markerContract);
  }

  /**
  * prepare and individual 
  * @method MarkerRelationships
  *
  */
  MarkerRelationships() {
    return {};
  }
}

export default MarkerContract;
