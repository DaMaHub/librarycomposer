'use strict'
/**
*  Prepare Besearch Contract
*
*
* @class BesearchContract
* @package    HOP library 
* @copyright  Copyright (c) 2025 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class BesearchContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  besearchContractform(be, stage) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    let concept = { stage };

    if (stage === 'cycle') {
      concept.capacity = be.capacity;
      concept.author = be.author;
      concept.permissions = be.permissions;
      concept.network = be.network || 'cold';
    } else if (stage === 'strand') {
      concept.context = be.context;
      concept.plan = be.plan;
      concept.result = be.result;
      concept.record = be.record;
      concept.network = be.network || 'cold';
    } else if (stage === 'braid') {
      concept.orgoRefs = be.orgoRefs;
      concept.gelleRefs = be.gelleRefs;
      concept.heliPulse = be.heliPulse;
      concept.network = be.network || 'cold';
    }

    const contract = {
      refcontract: 'besearch',
      concept,
      space: {
        hops: be.space?.hops ?? 0,
        context: be.space?.context || 'mind'
      },
      computational: {
        frequency: be.computational?.frequency ?? 0,
        gate: be.computational?.gate,
        confidence: be.computational?.confidence ?? 1,
        linkWeights: be.computational?.linkWeights || []
      },
      time: {
        decayRate: be.time?.decayRate ?? 0,
        timestamp: currentTime,
        ttl: be.time?.ttl
      }
    };
    return validateContract('besearch', contract);
  }

  relationshipsBuilder(be, relationships) {
    be.value.computational.relationships = relationships;
    be.value.time.timestamp = this.heliLive ? this.heliLive.helistamp() : Date.now();
    return be;
  }
}

export default BesearchContract;
