'use strict'
/**
*  KBL crypto Utility
*
*
* @class KBLcrytoUtility
* @package    KBL Crypto
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
// const util = require('util')
// const events = require('events')
import util from 'util'
import events from 'events'
import crypto from 'crypto'
import bs58 from 'bs58'
import hashObject from 'object-hash'

var KBLcryptoUtility = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(KBLcryptoUtility, events.EventEmitter)

/**
*  make KBID hash this is compute Ref. compute contract hash with results
* @method hashKBID
*
*/
KBLcryptoUtility.prototype.hashKBID = function (newContract, resulthash) {
  // prepare Contract evidence
  const contractEvidence = {}
  // contractEvidence.previous = null
  contractEvidence.contract = newContract
  contractEvidence.results = resulthash
  // let hashKBID = '39493493943949394'
  const hashKBID = this.evidenceProof(contractEvidence)
  return hashKBID
}

/**
*  return true or false
* @method compareHashes
*
*/
KBLcryptoUtility.prototype.compareHashes = function (inA, inB) {
  let hashMatch = false
  if (inA === inB) {
    hashMatch = true
  }
  return hashMatch
}

/**
*  create a new entity to hold KBIDs
* @method createKBID
*
*/
KBLcryptoUtility.prototype.entityID = function (addressIN) {
  // hash Object
  let tempTokenG = ''
  let kbundleHash = ''
  kbundleHash = hashObject(addressIN)
  const salt = crypto.randomBytes(16).toString('base64')
  // let hashs = crypto.createHmac('sha256',salt).update(password).digest('base64')
  const hash = crypto.createHmac('sha256', salt).update(kbundleHash).digest()
  // const bytes = Buffer.from('003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187', 'hex')
  tempTokenG = bs58.encode(hash)
  // decode
  // const addressde = address
  // const bytes = bs58.decode(addressde)
  // console.log(bytes.toString('base64'))
  return tempTokenG
}

/**
*  hash of proof of work
* @method evidenceProof
*
*/
KBLcryptoUtility.prototype.evidenceProof = function (dataEvidence) {
  const kbundleHashPart = hashObject(dataEvidence)
  // need some sort of holder back in ECS to build up evidence trail
  return kbundleHashPart
}

export default KBLcryptoUtility
