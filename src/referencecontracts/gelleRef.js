'use strict'
/**
*  Prepare Gelle Reference Contracts
*
*
* @class GelleReferenceContract
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class GelleReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  gellePrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    // Map meta to concept and data to computational as requested
    const contract = {
      refcontract: 'gelle',
      concept: {
        ...inputRC.meta,
        ...inputRC.data?.concept
      },
      computational: {
        ...inputRC.data?.emulation
      },
      space: inputRC.data?.space || { concept: 'mind' },
      time: inputRC.data?.time || {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };

    return validateContract('gelle', contract);
  }
}

export default GelleReferenceContract;

/*

{
  refcontract: 'exoCue',
  cueId: "cue_torso_core_01",
  name: "Torso Core Assembly",
  icon: "🎽",
  
  // Clean isolation of the inner biological mechanics
  innerPair: {
    orgoRef: "/contracts/orgos/torso_structural_orgo.json",
    gelleRef: "/contracts/gelles/torso_envelope_gelle.json"
  },

  // The sovereign communication boundary
  ports: {
    // Port 1: Head/Neck Link
    neck_socket: {
      type: "bi-directional",
      connectedTo: "cue_head_01/base_socket", // Fully grafted reference
      channels: ["neural_vagus", "vascular_main", "vestibular_balance"]
    },
    // Port 2 & 3: Upper Appendages
    left_shoulder_socket: {
      type: "bi-directional",
      connectedTo: "cue_left_arm_01/shoulder_plug",
      channels: ["neural_motor", "vascular_main"]
    },
    right_shoulder_socket: {
      type: "bi-directional",
      connectedTo: null, // Open and ready to graft
      channels: ["neural_motor", "vascular_main"]
    },
    // Port 4 & 5: Lower Appendages
    left_hip_socket: {
      type: "bi-directional",
      connectedTo: "cue_left_leg_01/hip_plug",
      channels: ["neural_motor", "vascular_main", "proprioception"]
    },
    right_hip_socket: {
      type: "bi-directional",
      connectedTo: null, // Open and ready to graft
      channels: ["neural_motor", "vascular_main", "proprioception"]
    }
  }
}

*/
