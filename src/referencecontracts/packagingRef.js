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
  console.log('packaingININNINII')
  console.log(inputRC)
  const datatypeReferenceContract = {}  
  datatypeReferenceContract.refcontract = 'packaging'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  const mergeDTColumn = this.mergePackageMap(inputRC.apicolumns, inputRC.apicolHolder) //  manual mapping to datatypes job for LLM
  const newPackagingMap = {}
  newPackagingMap.name = inputRC.name
  newPackagingMap.description = inputRC.description
  newPackagingMap.primary = inputRC.primary
  newPackagingMap.api = inputRC.api
  newPackagingMap.apibase = inputRC.apibase
  newPackagingMap.apipath = inputRC.apipath
  newPackagingMap.filename = inputRC.filename
  newPackagingMap.path = inputRC.path
  newPackagingMap.sqlitetablename = inputRC.sqlitetablename
  newPackagingMap.tablestructure = mergeDTColumn
  newPackagingMap.tidy = inputRC.tidy
  newPackagingMap.category = inputRC.category
  newPackagingMap.device = inputRC.device
  newPackagingMap.devicesList = inputRC.devicesList
  newPackagingMap.deviceColumns = inputRC.deviceColumns
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = newPackagingMap
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  return datatypeReferenceContract
}

/**
* prepare a datatype reference contract
* @method packagingBlindPrepare
*
*/
PackagingReferenceContract.prototype.packagingBlindPrepare = function (inputRC) {
  console.log('BLIND PACKAGING')
  console.log(inputRC)
  const datatypeReferenceContract = {}  
  datatypeReferenceContract.refcontract = 'packaging'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // need to prepare matching of datatyps ref contracts to table columns
  const mergeDTColumn = [{refcontract: 'blind1234555554321'}] // this.mergePackageMap(inputRC.apicolumns, inputRC.apicolHolder)  manual mapping to datatypes job for LLM
  const newPackagingMap = {}
  newPackagingMap.name = inputRC.name
  newPackagingMap.description = inputRC.description
  newPackagingMap.primary = inputRC.primary
  newPackagingMap.api = inputRC.api
  newPackagingMap.apibase = inputRC.apibase
  newPackagingMap.apipath = inputRC.apipath
  newPackagingMap.filename = inputRC.filename
  newPackagingMap.sqlitetablename = inputRC.sqlitetablename
  newPackagingMap.tablestructure = mergeDTColumn
  newPackagingMap.tidy = inputRC.tidy
  newPackagingMap.category = inputRC.category
  newPackagingMap.device = inputRC.device
  newPackagingMap.devicesList = inputRC.devicesList
  newPackagingMap.deviceColumns = inputRC.deviceColumns
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = newPackagingMap
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }
  datatypeReferenceContract.computational = { refcontract: null }
  return datatypeReferenceContract
}

/**
* map columns to datatype reference contracts
* @method mergePackageMap
*
*/
PackagingReferenceContract.prototype.mergePackageMap = function (col, table) {
  const mapped = []
  let countCol = 0
  for (const co of col) {
    if (co.count === countCol || co.count === countCol.cid) {
      console.log('match')
      const mapPair = {}
      mapPair.refcontract = table[co.name]
      mapPair.column = co.name
      mapped.push(mapPair)
      countCol++
    }
  }
  return mapped
}

export default PackagingReferenceContract
