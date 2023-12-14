'use strict'
/**
*  Prepare Datatype Reference Contracts
*
*
* @class DatatypeReferenceContract
* @package    Network Library
* @copyright  Copyright (c) 2023 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import util from 'util'
import events from 'events'

var DatatypeReferenceContract = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(DatatypeReferenceContract, events.EventEmitter)

/**
* prepare a datatype reference contract
* @method dataTypePrepare
*
*/
DatatypeReferenceContract.prototype.dataTypePrepare = function (inputRC) {
  const datatypeReferenceContract = {}
  datatypeReferenceContract.refcontract = 'datatype'
  datatypeReferenceContract.concept = {}
  datatypeReferenceContract.space = {}
  datatypeReferenceContract.computational = {}
  // prepare semantic part of datatype ref contracts
  datatypeReferenceContract.concept = inputRC
  // prepare space coordinates e.g. quark, atom, molecule etc.
  datatypeReferenceContract.space = { concept: 'mind' }

  return datatypeReferenceContract
}

export default DatatypeReferenceContract
