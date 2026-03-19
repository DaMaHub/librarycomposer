'use strict'
/**
*  Prepare Lifeboard Reference Contracts
*
*
* @class LifeboardContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class LifeboardContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare a lifeboard reference contract
  * @method lifeboardPrepare
  *
  */
  lifeboardPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const lifeboardContract = {
      refcontract: 'lifeboard',
      concept: inputRC,
      space: { concept: 'mind' },
      computational: { 'routines': 'start'},
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('lifeboard', lifeboardContract);
  }

  /**
  * prepare a lifeboard member reference contract
  * @method lbmemberPrepare
  *
  */
  lbmemberPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const lifeboardContract = {
      refcontract: 'lifeboard',
      concept: inputRC,
      space: { concept: 'mind' },
      computational: { 'routines': 'member'},
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('lifeboard', lifeboardContract);
  }
}

export default LifeboardContract;
