'use strict'
/**
*  Prepare Units Reference Contracts (SI & Heli-Based)
*
*
* @class UnitsReferenceContract
* @package    Network Library
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class UnitsReferenceContract extends EventEmitter {
  constructor(heliLive, cryptoLive) {
    super();
    this.heliLive = heliLive;
    this.cryptoLive = cryptoLive;
  }

  /**
  * prepare a units reference contract
  * @method unitsPrepare
  * @param {Object} inputRC - The unit configuration (baseUnit, scaleFactor, label, references)
  *
  */
  unitsPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    // Default references for SI units
    const siReferences = {
      'm': ['https://en.wikipedia.org/wiki/Metre', 'https://www.bipm.org/en/measurement-units/si-base-units#metre'],
      'kg': ['https://en.wikipedia.org/wiki/Kilogram', 'https://www.bipm.org/en/measurement-units/si-base-units#kilogram'],
      's': ['https://en.wikipedia.org/wiki/Second', 'https://www.bipm.org/en/measurement-units/si-base-units#second'],
      'A': ['https://en.wikipedia.org/wiki/Ampere', 'https://www.bipm.org/en/measurement-units/si-base-units#ampere'],
      'K': ['https://en.wikipedia.org/wiki/Kelvin', 'https://www.bipm.org/en/measurement-units/si-base-units#kelvin'],
      'mol': ['https://en.wikipedia.org/wiki/Mole_(unit)', 'https://www.bipm.org/en/measurement-units/si-base-units#mole'],
      'cd': ['https://en.wikipedia.org/wiki/Candela', 'https://www.bipm.org/en/measurement-units/si-base-units#candela'],
      'heli': ['https://hop.io/concepts/heli-stamp']
    };

    const concept = {
      baseUnit: inputRC.baseUnit,
      scaleFactor: inputRC.scaleFactor || 1,
      label: inputRC.label || inputRC.baseUnit,
      references: inputRC.references || siReferences[inputRC.baseUnit] || []
    };

    const unitsReferenceContract = {
      refcontract: 'units',
      concept: concept,
      space: { concept: 'mind' }, // Default space for units
      computational: { 
        refcontract: null,
        logic: `Value * ${concept.scaleFactor} = ${concept.baseUnit}`
      },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    validateContract('units', unitsReferenceContract);

    // create a hash of entries as the index key
    const dtHASH = this.cryptoLive.evidenceProof(unitsReferenceContract);
    const RefContractHolder = {
      type: 'library',
      reftype: 'units',
      action: 'PUT',
      data: {
        hash: dtHASH,
        contract: unitsReferenceContract
      }
    };
    
    return RefContractHolder;
  }
}

export default UnitsReferenceContract;
