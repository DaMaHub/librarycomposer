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
    console.log('parep conract LIBCOMP')
    console.log(contract)
    return contract;
  }

  relationshipsBuilder(cue, relationships) {
    console.log('relathip update')
    console.log(cue)
    console.log(relationships)
    cue.value.computational.relationships = relationships;
    cue.value.time.lastTimestamp = DateTime.now().toMillis();
    cue.value.time.frequencyCount += 1;
    return cue;
  }
}

export default CuesContract;