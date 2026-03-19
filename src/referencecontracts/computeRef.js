'use strict'
/**
*  Prepare Compute Reference Contracts
*
*
* @class ComputeReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class ComputeReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare a compute reference contract
  * @method computePrepare
  *
  */
  computePrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const computeReferenceContract = {
      refcontract: 'compute',
      concept: {},
      computational: inputRC,
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('compute', computeReferenceContract);
  }
}

export default ComputeReferenceContract;
