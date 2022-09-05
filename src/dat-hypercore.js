'use strict'
/**
*  Dat-hypercore protocol api
*
*
* @class DatHyperCore
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
// const DatAPI = require('my-dat')
const util = require('util')
const events = require('events')
// console.log(DatAPI)

var DatHyperCore = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(DatHyperCore, events.EventEmitter)

/**
* save or update a new reference contract
* @method saveReferenceContract
*
*/
DatHyperCore.prototype.saveReferenceContract = async function () {
  console.log('new ref contract')
}

/**
* get a new reference contract
* @method getReferenceContract
*
*/
DatHyperCore.prototype.getReferenceContract = async function () {
  console.log('get ref contract')
}

export default DatHyperCore
