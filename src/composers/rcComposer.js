'use strict'
/**
*  Prepare Reference Contracts
*
*
* @class ReferenceContractComposer
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import LifeboardRefCont from '../referencecontracts/lifeboardRef.js'
import QuestionRefCont from '../referencecontracts/questionRef.js'
import DatatypeRefCont from '../referencecontracts/datatypeRef.js'
import PackagingRefCont from '../referencecontracts/packagingRef.js'
import ComputeRefCont from '../referencecontracts/computeRef.js'
import VisualiseRefCont from '../referencecontracts/visualiseRef.js'
import ModulueRefCont from '../referencecontracts/moduleRef.js'
import ExperimentRefCont from '../referencecontracts/experimentRef.js'
import UnitsRefCont from '../referencecontracts/unitsRef.js'
import events from 'events'

class ReferenceContractComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliclock
    this.lifeboardRefLive = new LifeboardRefCont(this.heliLive)
    this.questionRefLive = new QuestionRefCont(this.heliLive)
    this.datatypeRefLive = new DatatypeRefCont(this.heliLive)
    this.packagingRefLive = new PackagingRefCont(this.heliLive)
    this.computeRefLive = new ComputeRefCont(this.heliLive)
    this.visualiseRefLive = new VisualiseRefCont(this.heliLive)
    this.moduleRefLive = new ModulueRefCont(this.heliLive)
    this.experimentRefLive = new ExperimentRefCont(this.heliLive)
    this.unitsRefLive = new UnitsRefCont(this.heliLive, this.cryptoLive)
  }

  /**
  * Lifeboard composer
  * @method lifeboardComposer
  *
  */
  lifeboardComposer(input, type) {
    try {
      let preContract = {}
      if (type === 'new') {
        preContract = this.lifeboardRefLive.lifeboardPrepare(input)
      } else if (type === 'member') {
        preContract = this.lifeboardRefLive.lbmemberPrepare(input)
      }
      return preContract
    } catch (error) {
      console.error('Validation Error in lifeboardComposer:', error.message)
      throw error
    }
  }

  /**
  * question composer
  * @method questionComposer
  *
  */
  questionComposer(input) {
    try {
      const prepContract = this.questionRefLive.questionPrepare(input)
        // create a hash of entries as the index key
        const dtHASH = this.cryptoLive.createKey(prepContract)
        const RefContractHolder = {}
        RefContractHolder.type = 'library'
        RefContractHolder.action = 'contracts'
        RefContractHolder.privacy = 'public'
        RefContractHolder.reftype = 'datatype'
        RefContractHolder.task = 'PUT'
        let contractData = {}
        contractData.hash = this.cryptoLive.createPrefixedKey(RefContractHolder.reftype, dtHASH)
        contractData.contract = prepContract
        RefContractHolder.data = contractData
      return RefContractHolder
    } catch (error) {
      console.error('Validation Error in questionComposer:', error.message)
      throw error
    }
  }

  /**
  * Datatype composer
  * @method datatypeComposer
  *
  */
  datatypeComposer(input) {
    console.log('datatypeCOMPOSER')
    console.log(input)
    try {
      const prepContract = this.datatypeRefLive.dtContractform(input)
      console.log('prepContract after VALIDATION')
      console.log(prepContract)
        // create a hash of entries as the index key
        const dtHASH = this.cryptoLive.createKey(prepContract)
        const RefContractHolder = {}
        RefContractHolder.type = 'library'
        RefContractHolder.action = 'contracts'
        RefContractHolder.privacy = 'public'
        RefContractHolder.reftype = 'datatype'
        RefContractHolder.task = 'PUT'
        let contractData = {}
        contractData.hash = this.cryptoLive.createPrefixedKey(RefContractHolder.reftype, dtHASH)
        contractData.contract = prepContract
        RefContractHolder.data = contractData
      return RefContractHolder
    } catch (error) {
      console.error('Validation Error in datatypeComposer:', error.message)
      throw error
    }
  }

  /**
  * Packaging composer
  * @method packagingComposer
  *
  */
  packagingComposer(input) {
    try {
      // check if genesis or join
      const prepContract = this.packagingRefLive.packagingPrepare(input)
      const dtHASH = this.cryptoLive.createKey(prepContract)
      const RefContractHolder = {}
      RefContractHolder.type = 'library'
      RefContractHolder.action = 'contracts'
      RefContractHolder.privacy = 'public'
      RefContractHolder.reftype = 'packaging'
      RefContractHolder.task = 'PUT'
      let contractData = {}
      contractData.hash = this.cryptoLive.createPrefixedKey(RefContractHolder.reftype, dtHASH)
      contractData.contract = prepContract
      RefContractHolder.data = contractData
      return RefContractHolder
    } catch (error) {
      console.error('Validation Error in packagingComposer:', error.message)
      throw error
    }
  }

  /**
  * Compute composer
  * @method computeComposer
  *
  */
  computeComposer(input) {
    try {
      const prepContract = this.computeRefLive.computePrepare(input)
      const dtHASH = this.cryptoLive.createKey(prepContract)
      const RefContractHolder = {}
      RefContractHolder.type = 'library'
      RefContractHolder.action = 'contracts'
      RefContractHolder.privacy = 'public'
      RefContractHolder.reftype = 'compute'
      RefContractHolder.task = 'PUT'
      let contractData = {}
      contractData.hash = this.cryptoLive.createPrefixedKey(RefContractHolder.reftype, dtHASH)
      contractData.contract = prepContract
      RefContractHolder.data = contractData
      return RefContractHolder
    } catch (error) {
      console.error('Validation Error in computeComposer:', error.message)
      throw error
    }
  }

  /**
  * Visualise composer
  * @method visualiseComposer
  *
  */
  visualiseComposer(input) {
    try {
      const prepContract = this.visualiseRefLive.visualisePrepare(input)
      const dtHASH = this.cryptoLive.createKey(prepContract)
      const RefContractHolder = {}
      RefContractHolder.type = 'library'
      RefContractHolder.action = 'contracts'
      RefContractHolder.privacy = 'public'
      RefContractHolder.reftype = 'visualise'
      RefContractHolder.task = 'PUT'
      let contractData = {}
      contractData.hash = this.cryptoLive.createPrefixedKey(RefContractHolder.reftype, dtHASH)
      contractData.contract = prepContract
      RefContractHolder.data = contractData
      return RefContractHolder
    } catch (error) {
      console.error('Validation Error in visualiseComposer:', error.message)
      throw error
    }
  }

  /**
  * moduleComposer composer
  * @method moduleComposer
  *
  */
  moduleComposer(input, action) {
    try {
      let preContract = {}
      if (action === 'join') {
        preContract = this.moduleRefLive.moduleJoinPrepare(input)
      } else if (action === 'update') {
        preContract = this.moduleRefLive.moduleUpdatePrepare(input)
      } else if (action === 'temp') {
        preContract = this.moduleRefLive.moduleGenesisTemp(input)
      } else {
        preContract = this.moduleRefLive.moduleGenesisPrepare(input)
      }
      return preContract
    } catch (error) {
      console.error('Validation Error in moduleComposer:', error.message)
      throw error
    }
  }

  /**
  * Experiment composer
  * @method experimentComposerGenesis
  *
  */
  experimentComposerGenesis(input) {
    try {
      const preContract = this.experimentRefLive.nxpPrepare(input)
      return preContract
    } catch (error) {
      console.error('Validation Error in experimentComposerGenesis:', error.message)
      throw error
    }
  }

  /**
  * Experiment composer
  * @method experimentComposerJoin
  *
  */
  experimentComposerJoin(genkey, input) {
    try {
      const preContract = this.experimentRefLive.nxpJoinedPrepare(genkey, input)
      return preContract
    } catch (error) {
      console.error('Validation Error in experimentComposerJoin:', error.message)
      throw error
    }
  }

  /**
  * Units composer
  * @method unitsComposer
  *
  */
  unitsComposer(input) {
    try {
      const preContract = this.unitsRefLive.unitsPrepare(input)
      return preContract
    } catch (error) {
      console.error('Validation Error in unitsComposer:', error.message)
      throw error
    }
  }

  /**
  * match contract id to ref contract
  * @method refcontractLookup
  *
  */
  refcontractLookup(refCont, allContracts) {
    let matchKey = {}
    for (const rc of allContracts) {
      if (refCont.trim() === rc.key) {
        matchKey = rc
      }
    }
    return matchKey
  }
}

export default ReferenceContractComposer