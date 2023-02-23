'use strict'
/**
*  Utilty to get info from reference contracts
*
*
* @class RCutility
* @package    Network Library
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from './cryptoUtility.js'
import util from 'util'
import events from 'events'

var RCutility = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(RCutility, events.EventEmitter)

/**
* match contract id to ref contract
* @method refcontractLookup
*
*/
RCutility.prototype.refcontractLookup = function (refCont, allContracts) {
  let matchKey = {}
  for (const rc of allContracts) {
    if (refCont.trim() === rc.key) {
      matchKey = rc
    }
  }
  return matchKey
}

/**
* seperate reference contracts by contract type
* @method refcontractSperate
*
*/
RCutility.prototype.refcontractSperate = function (refContractsList) {
  const refContractHolder = {}
  const datatypeList = []
  const unitsList = []
  const computeList = []
  const packagingList = []
  const moduleList = []
  const visualiseList = []
  const nxpList = []
  for (const rc of refContractsList) {
    if (rc.value.refcontract === 'datatype') {
      const refCont = { key: rc.key, value: rc.value }
      datatypeList.push(refCont)
    } else if (rc.value.refcontract === 'units') {
      const refCont = { key: rc.key, value: rc.value }
      unitsList.push(refCont)
    } else if (rc.value.refcontract === 'compute') {
      const refCont = { key: rc.key, value: rc.value }
      computeList.push(refCont)
    } else if (rc.value.refcontract === 'packaging') {
      const refCont = { key: rc.key, value: rc.value }
      packagingList.push(refCont)
    } else if (rc.value.refcontract === 'module') {
      const refCont = { key: rc.key, value: rc.value }
      moduleList.push(refCont)
    } else if (rc.value.refcontract === 'visualise') {
      const refCont = { key: rc.key, value: rc.value }
      visualiseList.push(refCont)
    } else if (rc.value.refcontract === 'experiment') {
      const refCont = { key: rc.key, value: rc.value }
      nxpList.push(refCont)
    } else if (rc.value.refcontract === 'experiment-join') {
      const refCont = { key: rc.key, value: rc.value }
      nxpList.push(refCont)
    }
  }
  // just return the latest modules (and all other contract TODO)
  refContractHolder.datatype = datatypeList
  refContractHolder.units = unitsList
  refContractHolder.compute = computeList
  refContractHolder.packaging = packagingList
  refContractHolder.module = moduleList
  refContractHolder.visualise = visualiseList
  refContractHolder.experiment = nxpList
  return refContractHolder
}

/**
* split experiments to genesis and peer joined
* @method experimentSplit
*
*/
RCutility.prototype.experimentSplit = function (inputNXPs) {
  const splitExperiments = {}
  let genesis = []
  let joined = []
  for (const exp of inputNXPs) {
    if (exp.value.concept.state === 'genesis') {
      genesis.push(exp)
    } else if (exp.value.concept.state === 'joined') {
      joined.push(exp)
    }
  }
  splitExperiments.genesis = genesis
  splitExperiments.joined = joined
  return splitExperiments
}

/**
* match network experiment to modules
* @method expMatchModule
*
*/
RCutility.prototype.expMatchModuleGenesis = function (allRefcont, expModules) {
  let expHolder = []
  for (const exp of expModules) {
    let expandedNXP = {}
    expandedNXP.modules = []
    for (const mod of exp.value.modules) {
      // match this key to module
      for (const mrf of allRefcont) {
        if (mod === mrf.key) {
          expandedNXP.modules.push(mrf)
        }
      }
    }
    expandedNXP.exp = exp
    expHolder.push(expandedNXP)
  }
  return expHolder
}

/**
* match network experiment to modules
* @method expMatchGenModule
*
*/
RCutility.prototype.expMatchModuleJoined = function (allRefcont, expModules) {
  let expJOINHolder = []
  // joined list of modules in NXP
  let joinModules = {}
  joinModules.exp = ''
  joinModules.modules = []
  for (const exp of expModules) {
    for (const mod of exp.value.modules) {
      // match this key to module
      for (const mrf of allRefcont) {
        if (mod === mrf.key) {
          joinModules.modules.push(mrf)
        }
      }
    }
    joinModules.exp = exp
    expJOINHolder.push(joinModules)
    joinModules = {}
    joinModules.modules = []
  }
  return expJOINHolder
}

/**
* match network experiment to modules
* @method expMatchModule
*
*/
RCutility.prototype.expMatchModuleLive = function (allRefcont, expModules) {
  let expHolder = []
  for (const exp of expModules) {
    // match this key to module
    for (const mrf of allRefcont) {
      if (exp.key === mrf.key) {
        expHolder.push(mrf)
      }
    }
  }
  return expHolder
}

/**
* extract the network experiment question module
* @method extractQuestion
*
*/
RCutility.prototype.extractQuestion = function (modules, typeAsk) {
  let question = ''
  for (const mod of modules) {
    if (typeof (mod.value) === 'object') {
      if (mod.value.info.moduleinfo.name === typeAsk) {
        question = mod.value.concept.question
      }
    }
  }
  return question
}

/**
* extract the network experiment question module
* @method extractData
*
*/
RCutility.prototype.extractData = function (modules, typeAsk) {
  let packages = []
  for (const mod of modules) {
    if (mod.value.info.moduleinfo.name === typeAsk) {
      packages.push(mod.value.info)
    }
  }
  return packages
}

/**
* extract the network experiment question module
* @method extractCompute
*
*/
RCutility.prototype.extractCompute = function (modules, typeAsk) {
  let computes = []
  for (const mod of modules) {
    if (mod.value.info.moduleinfo.name === typeAsk) {
      computes.push(mod.value.info)
    }
  }
  return computes
}

/**
* extract the network experiment question module
* @method extractVisualise
*
*/
RCutility.prototype.extractVisualise = function (modules, typeAsk) {
  let visuals = []
  for (const mod of modules) {
    if (mod.value.info.moduleinfo.name === typeAsk) {
      visuals.push(mod.value.info)
    }
  }
  return visuals
}

/**
* extract the network experiment question module
* @method extractEduction
*
*/
RCutility.prototype.extractEducation = function (modules, typeAsk) {
  let education = []
  for (const mod of modules) {
    if (mod.value.info.moduleinfo.name === typeAsk) {
      education.push(mod.value.info)
    }
  }
  return education
}

/**
* extract the network experiment question module
* @method extractQuestion
*
*/
RCutility.prototype.extractQuestionJOINED = function (modules, typeAsk) {
  let question = ''
  for (const mod of modules) {
    if (mod.value.concept !== undefined) {
      if (mod.value.concept.type === typeAsk) {
        question = mod.value.info.question.text
      }
    }
  }
  return question
}

/**
* map columns to datatype reference contracts
* @method mergePackageMap
*
*/
RCutility.prototype.mergePackageMap = function (col, table) {
  const mapped = []
  // remove first element array empty by design
  table.shift()
  let countCol = 1
  for (const co of col) {
    for (const tb of table) {
      if (co.count === countCol) {
        const mapPair = {}
        mapPair.refcontract = tb[0].key
        mapPair.column = co.name
        mapped.push(mapPair)
        countCol++
      }
    }
  }
  return mapped
}

/**
* extract ref contracts from modules
* @method extractRefcontracts
*
*/
RCutility.prototype.extractRefcontracts = function (modulesGrid, peerContext) {
  let newDisplayOrder = []
  let referenceContracts = []
  if (peerContext === 'public') {
    // first match for question
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'question') {
        newDisplayOrder.push(mod)
        referenceContracts.push()
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'visualise') {
        newDisplayOrder.push(mod)
        referenceContracts.push()
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'compute') {
        newDisplayOrder.push(mod)
        referenceContracts.push()
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.moduleinfo.name === 'data') {
        newDisplayOrder.push(mod)
        referenceContracts.push()
      }
    }
    // second match for visualisation
    // third match for compute
    // forth devices and then other modules as added
  } else if (peerContext === 'private') {
    // first match for question
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'question') {
        newDisplayOrder.push(mod)
        referenceContracts.push(mod)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'visualise') {
        newDisplayOrder.push(mod)
        referenceContracts.push(mod.value.info.visualise)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'compute') {
        console.log('compute')
        console.log(mod)
        newDisplayOrder.push(mod)
        referenceContracts.push(mod.value.info.compute)
      }
    }
    for (let mod of modulesGrid) {
      if (mod.value.info.type === 'data') {
        newDisplayOrder.push(mod)
        referenceContracts.push(mod.value.info.data)
      }
    }
    // second match for visualisation
    // third match for compute
    // forth devices and then other modules as added
  }
  return referenceContracts
  // return newDisplayOrder
}

export default RCutility
