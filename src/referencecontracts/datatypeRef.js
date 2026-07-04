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
    console.log('data reaching formation datatype')
    console.log(inputRC)
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const contract = {
      refcontract: 'datatype',
      concept: {
        primary: true,
        name: inputRC.name,
        description: inputRC.description,
        wiki: inputRC.wiki,
        rdf: inputRC.rdf
      },
      computational: {
        // measurement: inputRC.measurement,
        // datatypeType: inputRC.datatypeType
      },
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

/*
  "measurement": { "type": "string" },
  "datatypeType": { "type": "string", "enum": ["integer", "float", "boolean", "string", "array", "object", "datatype"] }
*/
