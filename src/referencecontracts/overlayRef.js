'use strict'
/**
*  Prepare Overlay Reference Contracts
*
*
* @class OverlayReferenceContract
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class OverlayReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  overlayForm(inputRC) {
    console.log('overlay input to buld form')
    console.log(inputRC)
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    const contract = {
      refcontract: 'overlay',
      concept: {
        "name": inputRC.name,
        "description": inputRC.description,
      },
      computational: {
        "tinydevice": inputRC.tinydevice,
        "conduction": {
          "version": inputRC.conduction.version,
          "heli": inputRC.conduction.heli
        },
        "emulation": inputRC.emulation,
        "scaleAnchor": {
          "unit": inputRC.scaleAnchor.unit,
          "modulusType": inputRC.scaleAnchor.modulusType,
          "value": inputRC.scaleAnchor.value
        },
        "overlayData": {
          "morphology": inputRC.map.morphologyPath,
          "data": inputRC.map.cueMapPath
        },
        "sourcePath": inputRC.filePath
      },
      space: inputRC.data?.space || { concept: 'mind' },
      time: inputRC.data?.time || {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    console.log('overlay conract')
    console.log(contract)
    return validateContract('overlay', contract);
  }
}

export default OverlayReferenceContract;