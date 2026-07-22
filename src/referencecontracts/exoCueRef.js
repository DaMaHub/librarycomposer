'use strict'
/**
*  Prepare ExoCue Reference Contracts
*
*
* @class ExoCueReferenceContract
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class ExoCueReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  exoCuePrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    // Accommodating both the standard wrapper {meta, data} and the raw incoming format provided
    const conceptData = inputRC.concept || inputRC.data?.concept || {};
    const computationalData = inputRC.computational || inputRC.data?.computational || inputRC.data?.emulation || {};

    const contract = {
      refcontract: 'exocue',
      concept: {
        ...(inputRC.meta || {}),
        ...conceptData
      },
      computational: {
        ...computationalData
      },
      space: inputRC.space || inputRC.data?.space || { concept: 'mind' },
      time: inputRC.time || inputRC.data?.time || {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };

    return validateContract('exocue', contract);
  }
}

export default ExoCueReferenceContract;