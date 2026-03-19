'use strict'
/**
*  Prepare Model Contract
*
*
* @class ModelContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class ModelContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare and individual model
  * @method ModelContractform
  *
  */
  ModelContractform(inCue) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const modelContract = {
      refcontract: 'model',
      concept: inCue.concept,
      computational: inCue.computational,
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('model', modelContract);
  }

  /**
  * prepare and individual cue
  * @method ModelRelationships
  *
  */
  relationshipsBuilder(cue, relationships) {
    cue.computational.relationships = relationships;
    cue.time.lastTimestamp = Date.now();
    cue.time.frequencyCount += 1;
    return cue;
  }
}

export default ModelContract;
