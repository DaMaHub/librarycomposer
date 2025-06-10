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
import { DateTime } from 'luxon';

class DatatypeReferenceContract extends EventEmitter {
  constructor() {
    super();
  }

  dtContractform(inputRC) {
    const currentTime = DateTime.now().toMillis();
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
    return contract;
  }
}

export default DatatypeReferenceContract;
