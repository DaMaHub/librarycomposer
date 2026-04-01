'use strict'
/**
*  Prepare Cues Contract
*
*
* @class LifestrapContract
* @package    HOP library 
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class LifestrapContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  LifestrapContractform(lifestrap) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    const contract = {
      refcontract: 'lifestrap',
      concept: { story: lifestrap.inquiry },
      space: { concept: 'mind' },
      computational: { science: 'consilience-weave' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    return validateContract('lifestrap', contract);
  }

}

export default LifestrapContract;