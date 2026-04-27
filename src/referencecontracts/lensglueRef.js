'use strict'
/**
*  Prepare Lensglue Reference Contracts
*
*
* @class LensglueReferenceContract
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class LensglueReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  lensgluePrepare(inputRC) {
    console.log('lens glue prepare-------')
    console.log(inputRC)
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    // Map meta to concept and data to computational as requested
    const contract = {
      refcontract: 'lensglue',
      concept: {
        ...inputRC.meta,
        ...inputRC.data?.concept
      },
      computational: {
        ...inputRC.data?.emulation
      },
      space: inputRC.data?.space || { concept: 'mind' },
      time: inputRC.data?.time || {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };

    return validateContract('lensglue', contract);
  }
}

export default LensglueReferenceContract;
