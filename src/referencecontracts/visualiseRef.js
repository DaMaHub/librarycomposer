'use strict'
/**
*  Prepare Visualise Reference Contracts
*
*
* @class VisualiseReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class VisualiseReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare a visualise reference contract
  * @method visualisePrepare
  *
  */
  visualisePrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const visualiseReferenceContract = {
      refcontract: 'visualise',
      concept: {},
      computational: inputRC,
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('visualise', visualiseReferenceContract);
  }
}

export default VisualiseReferenceContract;
