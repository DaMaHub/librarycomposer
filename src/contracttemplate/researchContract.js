'use strict'
/**
*  Prepare Research Contracts
*
*
* @class ResearchContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class ResearchContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare and individual research
  * @method researchContractform
  *
  */
  researchContractform(inRe) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const researchContract = {
      refcontract: 'research',
      concept: inRe,
      space: { concept: 'mind' },
      computational: {},
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('research', researchContract);
  }

  /**
  * prepare and individual 
  * @method ResearchRelationships
  *
  */
  ResearchRelationships() {
    return {};
  }
}

export default ResearchContract;
