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
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class MediaContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare and individual media
  * @method mediaContractform
  *
  */
  mediaContractform(medIn) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const mediaContract = {
      refcontract: 'media',
      concept: medIn,
      space: { concept: 'mind' },
      computational: {},
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('media', mediaContract);
  }

  /**
  * prepare and individual 
  * @method mediaRelationships
  *
  */
  mediaRelationships() {
    return {};
  }
}

export default MediaContract;
