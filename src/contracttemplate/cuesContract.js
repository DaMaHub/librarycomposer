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
import { validateContract } from '../validation/validationUtility.js';

class CuesContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  cuesContractform(cue) {
    console.log('cue ingredient in')
    console.log(cue)
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const contract = {
      refcontract: 'cue',
      concept: {
        datatype: cue.datatype,
        network: cue.network || 'cold', // 'warm' or 'cold'
        links: cue.links || [] // Array of { target: string, type: 'systemic'|'causal'|'inhibitory' }
      },
      space: cue.space?.realWorld && cue.space?.emulation ? {
        realWorld: {
          latitude: cue.space.realWorld.latitude,
          longitude: cue.space.realWorld.longitude,
          altitude: cue.space.realWorld.altitude ?? 0,
          precision: cue.space.realWorld.precision || 'point'
        },
        emulation: {
          system: cue.space.emulation.system,
          coordinates: {
            x: cue.space.emulation.coordinates.x,
            y: cue.space.emulation.coordinates.y,
            z: cue.space.emulation.coordinates.z
          },
          scale: cue.space.emulation.scale ?? 1
        },
        metadata: cue.space.metadata || {}
      } : {
        concept: cue.space?.concept || 'mind'
      },
      computational: {
        frequency: cue.computational?.frequency ?? 0,
        gate: cue.computational?.gate,
        confidence: cue.computational?.confidence ?? 1,
        linkWeights: cue.computational?.linkWeights || [],
        color: cue.color
      },
      time: {
        decayRate: cue.time?.decayRate ?? 0,
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: cue.time?.frequencyCount ?? 1,
        ttl: cue.time?.ttl
      }
    };
    console.log('pre vallalal')
    console.log(contract)
    return validateContract('cue', contract);
  }

  relationshipsBuilder(cue, relationships) {
    cue.value.computational.relationships = relationships;
    cue.value.time.lastTimestamp = this.heliLive ? this.heliLive.helistamp() : Date.now();
    cue.value.time.frequency = 1;
    return cue;
  }
}

export default CuesContract;