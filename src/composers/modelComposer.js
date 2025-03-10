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
import CryptoUtility from '../cryptoUtility.js'
import ModelContract from '../contracttemplate/modelContract.js'
import util from 'util'
import events from 'events'

var ModelComposer = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
  this.liveModelContracts = new ModelContract()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(ModelComposer, events.EventEmitter)

/**
* prepare and indiviual model
* @method ModelPrepare
*
*/
ModelComposer.prototype.modelPrepare = function (inModel) {
  let modelContract = this.liveModelContracts.ModelContractform(inModel.data)
  console.log('compaers')
  console.log(modelContract)
  let modelReady = {}
  const modelHASH = this.cryptoLive.evidenceProof(modelContract)
  modelReady.id = modelHASH
  modelReady.data = modelContract
  return modelReady
}

/**
* prepare update relationships with model
* @method ModelRelationships
*
*/
ModelComposer.prototype.modelRelationships = function (modelUpdate) {
  let relContract = this.liveModelContracts.relationshipsBuilder(modelUpdate.data.contract, modelUpdate.data.relationships)
  let modelReady = {}
  const modelHASH = modelUpdate.data.contract.key
  modelReady.modelid = modelHASH
  modelReady.data = relContract.value
  return modelReady
}

export default ModelComposer