'use strict'
/**
*  Prepare Lifestrap Contracts
*
*
* @class LifestrapComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import LifestrapContract from '../contracttemplate/lifestrapContract.js'
import events from 'events'

class LifestrapComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveLifestrapContracts = new LifestrapContract(this.heliLive)
  }

  /**
  * prepare an individual lifestrap
  * @method lifestrapPrepare
  *
  */
  lifestrapPrepare(inLifestrap) {
    try {
      let lifestrapContract = this.liveLifestrapContracts.LifestrapContractform(inLifestrap.data)
      let lifestrapReady = {}
      const lifestrapHASH = this.cryptoLive.createKey(lifestrapContract)
      lifestrapReady.key = this.cryptoLive.createPrefixedKey('lifestrap', lifestrapHASH)
      lifestrapReady.contract = lifestrapContract
      return lifestrapReady
    } catch (error) {
      console.error('Validation Error in lifestrapPrepare:', error.message)
      throw error
    }
  }

  /**
  * update contract for latest timestamp
  * @method lifestrapTimestamp
  *
  */
  lifestrapTimestamp(lifestrapUpdate) {
    let lifestrapReady = {}
    lifestrapReady.lifestrapid = lifestrapUpdate.key
    lifestrapReady.data = lifestrapUpdate.value
    return lifestrapReady
  }

  /**
  * prepare update relationships with lifestrap
  * @method lifestrapRelationships
  *
  */
  lifestrapRelationships(lifestrapUpdate) {
    let relContract = this.liveLifestrapContracts.relationshipsBuilder(lifestrapUpdate.data.contract, lifestrapUpdate.data.relationships)
    let lifestrapReady = {}
    const lifestrapHASH = lifestrapUpdate.data.contract.key
    lifestrapReady.lifestrapid = lifestrapHASH
    lifestrapReady.data = relContract.value
    return lifestrapReady
  }
}

export default LifestrapComposer