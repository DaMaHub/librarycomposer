'use strict'
/**
*  Prepare Module Reference Contracts
*
*
* @class ModuleReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class ModuleReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare a module template reference contract
  * @method moduleGenesisPrepare
  *
  */
  moduleGenesisPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const moduleContract = {
      refcontract: 'module',
      info: inputRC,
      concept: {},
      computational: {},
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('module', moduleContract);
  }

  /**
  * prepare a module join reference contract
  * @method moduleJoinPrepare
  *
  */
  moduleJoinPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const moduleContract = {
      refcontract: 'module',
      info: inputRC,
      concept: { state: 'join' },
      computational: {},
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('module', moduleContract);
  }

  /**
  * prepare a module update reference contract
  * @method moduleUpdatePrepare
  *
  */
  moduleUpdatePrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const moduleContract = {
      refcontract: 'module',
      info: inputRC,
      concept: { state: 'update' },
      computational: {},
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('module', moduleContract);
  }

  /**
  * prepare a module temp reference contract
  * @method moduleGenesisTemp
  *
  */
  moduleGenesisTemp(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const moduleContract = {
      refcontract: 'module',
      info: inputRC,
      concept: { state: 'temp' },
      computational: {},
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('module', moduleContract);
  }
}

export default ModuleReferenceContract;
