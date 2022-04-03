'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class PackagingReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var PackagingReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(PackagingReferenceContract, events.EventEmitter)

/**
* prepare a datatype reference contract
* @method packagingPrepare
*
*/
PackagingReferenceContract.prototype.packagingPrepare = function (inputRC) {
  console.log('packing in')
  console.log(inputRC)
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'packaging'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  const mergeDTColumn = this.mergePackageMap(inputRC.apicolumns, inputRC.apicolHolder)
  console.log('merge colums back')
  console.log(mergeDTColumn)
  const newPackagingMap = {}
  newPackagingMap.name = inputRC.name
  newPackagingMap.description = inputRC.description
  newPackagingMap.primary = inputRC.primary
  newPackagingMap.api = inputRC.api
  newPackagingMap.apibase = inputRC.apibase
  newPackagingMap.apipath = inputRC.apipath
  newPackagingMap.tablestructure = mergeDTColumn
  newPackagingMap.tidy = inputRC.tidy
  newPackagingMap.category = inputRC.category
  newPackagingMap.device = inputRC.device
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = newPackagingMap
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  // create a hash of entries as the index key
  const dtHASH = this.cryptoLive.evidenceProof(datatypeReferenceContract)
  const RefContractHolder = {}
  RefContractHolder.type = 'library'
  RefContractHolder.reftype = 'packaging'
  RefContractHolder.action = 'PUT'
  RefContractHolder.hash = dtHASH
  RefContractHolder.contract = datatypeReferenceContract
  console.log('package holder')
  console.log(RefContractHolder)
  return RefContractHolder
}

/**
* map columns to datatype reference contracts
* @method mergePackageMap
*
*/
PackagingReferenceContract.prototype.mergePackageMap = function (col, table) {
  console.log('dt col matcher')
  console.log(col)
  console.log(table)
  const mapped = []
  // remove first element array empty by design
  table.shift()
  let countCol = 0
  for (const co of col) {
    countCol++
    if (co.count === countCol) {
      const keyID = countCol - 1
      const mapPair = {}
      mapPair.refcontract = table[keyID][0].key
      mapPair.column = co.name
      mapped.push(mapPair)
    }
  }
  return mapped
}

export default PackagingReferenceContract
