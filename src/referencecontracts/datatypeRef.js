'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class DatatypeReferenceContract
* @package    Network Library
* @copyright  Copyright (c) 2023 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class DatatypeReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  dtContractform(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const contract = {
      refcontract: 'datatype',
      concept: inputRC,
      computational: inputRC.computational,
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    return validateContract('datatype', contract);
  }
}

export default DatatypeReferenceContract;
