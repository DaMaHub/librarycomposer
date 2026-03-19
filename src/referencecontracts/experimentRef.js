'use strict'
/**
*  Prepare Experiment Reference Contracts
*
*
* @class ExperimentReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class ExperimentReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare network experiment ref contract
  * @method nxpPrepare
  *
  */
  nxpPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const nxpReferenceContract = {
      refcontract: 'experiment',
      modules: inputRC,
      concept: { state: 'genesis' },
      space: { concept: 'mind' },
      computational: { refcontract: null },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    validateContract('experiment', nxpReferenceContract);

    return nxpReferenceContract;
  }

  /**
  * prepare network experiment
  * @method nxpJoinedPrepare
  *
  */
  nxpJoinedPrepare(genkey, inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const nxpReferenceContract = {
      refcontract: 'experiment-join',
      genesis: genkey,
      modules: inputRC,
      concept: { state: 'joined' },
      space: { concept: 'mind' },
      computational: { refcontract: null },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    validateContract('experiment', nxpReferenceContract);

    return nxpReferenceContract;
  }
}

export default ExperimentReferenceContract;
