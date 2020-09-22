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
// const util = require('util')
// const events = require('events')
import util from 'util'
import events from 'events'

var RCutility = function () {
  events.EventEmitter.call(this)
  console.log('ref contract composer live')
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
  // console.log('seperate out the reference contracts')
  // console.log(refContractsList)
  const refContractHolder = {}
  const datatypeList = []
  const unitsList = []
  const computeList = []
  const packagingList = []
  const moduleList = []
  const visualiseList = []
  const nxpList = []
  for (const rc of refContractsList) {
    // console.log(rc)
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
    }
  }
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
  // console.log('experimentSplit')
  // console.log(inputNXPs)
  const splitExperiments = {}
  let genesis = []
  let joined = []
  for (const exp of inputNXPs) {
    console.log(exp.value.refcontract)
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
RCutility.prototype.expMatchModule = function (allRefcont, expModules) {
  // console.log(allRefcont)
  // console.log(expModules)
  let expHolder = []
  let expandedNXP = {}
  expandedNXP.modules = []
  for (const exp of expModules) {
    for (const mod of exp.value.modules) {
      // match this key to module
      for (const mrf of allRefcont) {
        if (mod.key === mrf.key) {
          expandedNXP.modules.push(mrf)
        }
      }
    }
    expandedNXP.exp = exp
    expHolder.push(expandedNXP)
    expandedNXP = {}
    expandedNXP.modules = []
  }
  return expHolder
}

/**
* match network experiment to modules
* @method expMatchGenModule
*
*/
RCutility.prototype.expMatchGenModule = function (allRefcont, expModules) {
  // console.log(allRefcont)
  // console.log(expModules)
  let expJOINHolder = []
  // joined list of modules in NXP
  let joinModules = {}
  joinModules.exp = ''
  joinModules.modules = []
  for (const exp of expModules) {
    for (const mod of exp.value.modules) {
      // match this key to module
      for (const mrf of allRefcont) {
        if (mod.key === mrf.key) {
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
RCutility.prototype.extractData = function (modules, typeAsk) {
  let packages = []
  for (const mod of modules) {
    console.log(mod)
    // console.log(mod.value.concept.moduleinfo.name)
    if (mod.value.concept.moduleinfo.name === typeAsk) {
      packages.push(mod.value.concept)
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
    // console.log(mod.value.concept.moduleinfo.name)
    if (mod.value.concept.moduleinfo.name === typeAsk) {
      computes.push(mod.value.concept)
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
    // console.log(mod.value.concept.moduleinfo.name)
    if (mod.value.concept.moduleinfo.name === typeAsk) {
      visuals.push(mod.value.concept)
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
    // console.log(mod.value.concept.moduleinfo.name)
    if (mod.value.concept.moduleinfo.name === typeAsk) {
      education.push(mod.value.concept)
    }
  }
  return education
}

/**
* extract the network experiment question module
* @method extractQuestion
*
*/
RCutility.prototype.extractQuestion = function (modules, typeAsk) {
  // console.log('question mod matcher')
  // console.log(modules)
  // console.log(typeAsk)
  let question = ''
  for (const mod of modules) {
    // console.log(typeof (mod.value))
    if (typeof (mod.value) === 'object') {
      if (mod.value.concept.moduleinfo.name === typeAsk) {
        question = mod.value.concept.question
      }
    }
  }
  return question
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
        question = mod.value.concept.question.text
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
    // console.log(co)
    for (const tb of table) {
      // console.log(tb[0])
      if (co.count === countCol) {
        const mapPair = {}
        mapPair.refcontract = tb[0].key
        mapPair.column = co.name
        mapped.push(mapPair)
        countCol++
      }
    }
  }
  // console.log('mapped pair')
  // console.log(mapped)
  return mapped
}

export default RCutility
