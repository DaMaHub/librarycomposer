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
import b4a from 'b4a'

class ReferenceContractComposer extends events.EventEmitter {
  constructor(contextAgents) {
    super()
    this.cryptoLive = contextAgents.crypto
    this.heliLive = contextAgents.heliLocation
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
datatypeComposer(lsKey, input) {
  try {
    const prepContract = this.datatypeRefLive.dtContractform(input)
    
    // 1. Create the raw 32-byte hash
    const dtHASH = this.cryptoLive.createKey(prepContract)
    
    // 2. CLEAN THE HEAD: Strip the 'lifestrap!' prefix if it's there
    // and force the 32-byte ID into a 64-character hex string.
    let cleanLSID;
    if (b4a.isBuffer(lsKey)) {
        // If it's the 42-byte content key, take the last 32 bytes
        const idBuf = lsKey.length > 32 ? lsKey.slice(lsKey.length - 32) : lsKey;
        cleanLSID = b4a.toString(idBuf, 'hex');
    } else {
        // If it's a string, just strip any 'lifestrap!' text
        cleanLSID = lsKey.replace('lifestrap!', '');
    }

    // 3. Create the Stitch Key
    // By passing the cleanLSID (hex) and dtHASH (binary) to your utility,
    // the utility can now form a clean [HEX]!link![HEX] key.
    const stitchKey = this.cryptoLive.createStitchKey(cleanLSID, dtHASH)
    
    const dtContentKey = this.cryptoLive.createContentKey('datatype', dtHASH)
    
    return {
      hash: stitchKey,
      contentKey: dtContentKey,
      contract: prepContract
    }
  } catch (error) {
    console.error('Validation Error in datatypeComposer:', error.message)
    throw error
  }
}

/*
datatypeComposer(lsKey, input) {
  try {
    const prepContract = this.datatypeRefLive.dtContractform(input)
    const dtHASH = this.cryptoLive.createKey(prepContract) 
    
    // 1. ENSURE THE HEAD IS CLEAN
    // If lsKey is the 42-byte buffer, we slice it to get just the 32-byte hash
    const cleanLSID = (b4a.isBuffer(lsKey) && lsKey.length > 32) 
      ? lsKey.slice(lsKey.length - 32) 
      : lsKey;

    // 2. Create the stitch using the raw 32-byte ID and raw 32-byte DT Hash
    // This will force both sides to Hex in your utility
    const stitchKey = this.cryptoLive.createStitchKey(cleanLSID, dtHASH)
    
    const dtContentKey = this.cryptoLive.createContentKey('datatype', dtHASH)
    
    return {
      hash: stitchKey,
      contentKey: dtContentKey,
      contract: prepContract
    }
  } catch (error) { ... }
}
*/



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