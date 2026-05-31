'use strict'
/**
*  Prepare Peer Contract
*
*
* @class PeerContract
* @package    HOP library 
* @copyright  Copyright (c) 2025 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class PeerContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  PeerContractform(peer) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    
    const contract = {
      refcontract: 'peer',
      concept: {
        datatype: peer.datatype || 'peer-identity',
        publickey: peer.publickey,
        name: peer.name,
        roletaken: peer.roletaken,
        longterm: peer.longterm ?? true,
        topic: peer.topic || '',
        settopic: peer.settopic ?? false,
        topic: '',
        live: peer.live ?? false,
        status: peer.status || 'warm'
      },
      computational: {
        network: peer.network || 'warm',
        topic: peer.topic || '', // computational topic might differ or be same as concept topic
        trustWeight: peer.trustWeight ?? 0.8,
        permissions: peer.permissions || ['interplay', 'read-cues', 'sync-heli']
      },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0,
        lastHeliSignature: peer.lastHeliSignature || '',
        lastPulse: peer.lastPulse ?? 0
      },
      space: {
        concept: peer.spaceConcept || 'peer-node',
        bioregion: peer.bioregion || '',
        proximity: peer.proximity || 'remote'
      }
    };
    return validateContract('peer', contract);
  }

  relationshipsBuilder(peer, relationships) {
    peer.value.computational.relationships = relationships;
    peer.value.time.lastTimestamp = this.heliLive ? this.heliLive.helistamp() : Date.now();
    return peer;
  }

}

export default PeerContract;
