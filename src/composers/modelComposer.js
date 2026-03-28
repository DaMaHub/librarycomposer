'use strict'
/**
*  Prepare Model Contracts
*
*
* @class ModelComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import ModelContract from '../contracttemplate/modelContract.js'
import events from 'events'

class ModelComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveModelContracts = new ModelContract(this.heliLive)
  }

  /**
  * prepare and indiviual model
  * @method ModelPrepare
  *
  */
  modelPrepare(inModel) {
    try {
      let modelContract = this.liveModelContracts.ModelContractform(inModel.data)
      let modelReady = {}
      const modelHASH = this.cryptoLive.createKey(modelContract)
      modelReady.id = this.cryptoLive.createPrefixedKey('model', modelHASH)
      modelReady.data = modelContract
      return modelReady
    } catch (error) {
      console.error('Validation Error in modelPrepare:', error.message)
      throw error
    }
  }

  /**
  * prepare update relationships with model
  * @method ModelRelationships
  *
  */
  modelRelationships(modelUpdate) {
    let relContract = this.liveModelContracts.relationshipsBuilder(modelUpdate.data.contract, modelUpdate.data.relationships)
    let modelReady = {}
    const modelHASH = modelUpdate.data.contract.key
    modelReady.modelid = modelHASH
    modelReady.data = relContract.value
    return modelReady
  }
}

export default ModelComposer