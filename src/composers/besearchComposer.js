'use strict'
/**
*  Prepare Besearch Composers
*
*
* @class BesearchComposer
* @package    HOP health
* @copyright  Copyright (c) 2025 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import BesearchContract from '../contracttemplate/besearchContract.js'
import events from 'events'
import b4a from 'b4a'

const KEY_TYPES = {
  CYCLE: 0x01,
  STRAND: 0x02,
  BRAID: 0x03
};

const SEP = b4a.from([0x00]);

class BesearchComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveBesearchContracts = new BesearchContract(this.heliLive)
    
    this.indexer = {
      cycle: (cycleId) => {
        return b4a.concat([
          b4a.from([KEY_TYPES.CYCLE]),
          b4a.from(cycleId)
        ]);
      },
      strand: (cycleId, strandId) => {
        return b4a.concat([
          b4a.from([KEY_TYPES.STRAND]),
          b4a.from(cycleId),
          SEP,
          b4a.from(strandId)
        ]);
      },
      braid: (cycleId, strandId, braidId) => {
        return b4a.concat([
          b4a.from([KEY_TYPES.BRAID]),
          b4a.from(cycleId),
          SEP,
          b4a.from(strandId),
          SEP,
          b4a.from(braidId)
        ]);
      }
    };
  }

  /**
  * prepare and indiviual besearch
  * @method besearchPrepare
  *
  */
  besearchPrepare(beData) {
    try {
      const stage = beData.stage || 'cycle'
      const { cycleId, strandId, braidId } = beData
      
      const beContract = this.liveBesearchContracts.besearchContractform(beData.data, stage)
      
      let beKey
      if (stage === 'cycle') {
        beKey = this.indexer.cycle(cycleId)
      } else if (stage === 'strand') {
        beKey = this.indexer.strand(cycleId, strandId)
      } else if (stage === 'braid') {
        beKey = this.indexer.braid(cycleId, strandId, braidId)
      }
      
      let beReady = {}
      beReady.cueid = beKey
      beReady.data = beContract
      
      return beReady
    } catch (error) {
      console.error('Validation Error in besearchPrepare:', error.message)
      throw error
    }
  }

  /**
  * update contract for latest timestamp
  * @method besearchTimestamp
  *
  */
  besearchTimestamp(beUpdate) {
    let beReady = {}
    beReady.cueid = beUpdate.key
    beReady.data = beUpdate.value
    return beReady
  }
}

export default BesearchComposer
