'use strict'
/**
*  Prepare Knowledge Bundle Entry
*
*
* @class KbidComposer
* @package    Network Library
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import KbidEntry from '../kbids/KBIDentry.js'
import events from 'events'

class KbidComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.entryLive = new KbidEntry()
  }

  /**
  * A new template entry set per experiment
  * @method kbidTemplateNew
  *
  */
  kbidTemplateNew(input) {
    console.log('prepare New KBID template entry')
    const templateEntry = this.entryLive.prepareKBIDtemplate(input)
    return templateEntry
  }

  /**
  * a peer knowledge bundle entry
  * @method kbidEntry
  *
  */
  kbidEntry(input) {
    console.log('prepare KBID entry')
    const kbidEntry = this.entryLive.prepareKBIDentry(input)
    return kbidEntry
  }
}

export default KbidComposer
