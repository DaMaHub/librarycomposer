'use strict'
/**
*  Prepare Question Reference Contracts
*
*
* @class ReferenceContract
* @package    HOP
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var questionReferenceContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(questionReferenceContract, events.EventEmitter)

/**
* prepare a Question reference contract
* @method QuestionPrepare
*
*/
questionReferenceContract.prototype.questionPrepare = function (inputRC) {
  const questionReferenceContract = {}
  questionReferenceContract.refcontract = 'question'
  questionReferenceContract.concept = inputRC
  // prepare semantic part of Question ref contracts
  questionReferenceContract.computational = {}
  return questionReferenceContract
}

export default questionReferenceContract
