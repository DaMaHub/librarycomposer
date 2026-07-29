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

  exoCueForm(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    const contract = {
      refcontract: 'exocue',
      concept: {
        cue: inputRC.cue,
      },
      computational: {
        organelles: {
          orgo: inputRC.orgo,
          gelle: inputRC.gelle
        },
        components: {
        }
      },
      space: inputRC.data?.space || { concept: 'mind' },
      time: inputRC.data?.time || {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };

    return validateContract('exocue', contract);
  }
}

export default ExoCueReferenceContract;