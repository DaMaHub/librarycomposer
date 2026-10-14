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
        datatype: 'peer-contract',
        publickey: peer.key,
        name: peer.concept.name,
        roletaken: peer.concept.roletaken,
        longterm: true,
        topic: peer.concept.topic,
        settopic: peer.concept.settopic,
        live: false,
        status: 'warm'
      },
      computational: {
        network: 'warm',
        topic: peer.concept.topic,
        trustWeight: peer.trustWeight ?? 0.8,
        permissions: peer.permissions || ['interplay', 'read-cues', 'sync-heli']
      },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0,
        lastHeliSignature: '',
        lastPulse: 0
      },
      space: {
        concept: 'peer-record',
        bioregion: 'peer-record',
        proximity: 'earth'
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
