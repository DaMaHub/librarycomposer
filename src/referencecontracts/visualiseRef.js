'use strict'
/**
*  Prepare Visualise Reference Contracts
*
*
* @class VisualiseReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class VisualiseReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare a visualise reference contract
  * @method visualisePrepare
  *
  */
  visualisePrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const visualiseReferenceContract = {
      refcontract: 'visualise',
      concept: {},
      computational: inputRC,
      space: { concept: 'mind' },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('visualise', visualiseReferenceContract);
  }
}

export default VisualiseReferenceContract;


// visualiseRef.js (Upgraded for HOP Emulation)
// Location: Computational Space | Environment: BentoBoxDS / WASM Bridge

export const visualiseRef = {
  contractId: "hop-emulation-v1",
  
  /**
   * Concept-to-Space Mapping:
   * Maps abstract 'Resonance' to physical 'Properties' in the Emulation.
   */
  attachToWorld: (scale, resonanceVector, bentoContext) => {
    // scale: Concept Level (e.g., 'bioregion')
    // resonanceVector: Computational Output from resonAgent
    
    const config = this.scales[scale];
    if (!config) return;

    // The 'Feel' Intensity (0.0 - 1.0)
    const intensity = resonanceVector[0]; 
    
    // Transformation Logic (The Algebra of the Space)
    const mappedValue = eval(config.resonanceMapping.transformation.replace('x', intensity));

    // Emission: Pushing state back into the World Space
    bentoContext.emit('UPDATE_EMULATION_STATE', {
      property: config.resonanceMapping.targetProperty, // e.g. 'river_turbidity'
      value: mappedValue
    });
  }
};