'use strict'
/**
*  Prepare Cues Contract
*
*
* @class CuesContract
* @package    HOP library 
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { DateTime } from 'luxon';

class CuesContract extends EventEmitter {
  constructor() {
    super();
  }

  cuesContractform(cue) {
    const contract = {
      refcontract: 'cue',
      concept: cue.concept,
      space: { concept: 'mind' },
      computational: cue.computational,
      time: {
        createTimestamp: DateTime.now().toMillis(),
        lastTimestamp: DateTime.now().toMillis(),
        frequencyCount: 0
      }
    };
    return contract;
  }

  relationshipsBuilder(cue, relationships) {
    cue.computational.relationships = relationships;
    cue.time.lastTimestamp = DateTime.now().toMillis();
    cue.time.frequencyCount += 1;
    return cue;
  }
}

export default CuesContract;