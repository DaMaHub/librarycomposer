'use strict'
/**
*  Prepare Marker Contract
*
*
* @class MarkerContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import CryptoUtility from '../cryptoUtility.js'
import util from 'util'
import events from 'events'

var MarkerContract = function () {
  events.EventEmitter.call(this)
  this.cryptoLive = new CryptoUtility()

}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(MarkerContract, events.EventEmitter)

/**
* prepare and indiviual cue
* @method markerContractform
*
*/
MarkerContract.prototype.markerContractform = function () {
  console.log('parddfdfdfdfepare cue contract please')
  let cueContract = {}
  cueContract.cuid = '11222'
  cueContract.data = {label: [1], datasets: [2]}
  return cueContract
}

/**
* prepare and indiviual 
* @method MarkerRelationships
*
*/
MarkerContract.prototype.relationshipsBuilder = function () {

}

export default MarkerContract