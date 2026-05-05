'use strict'
/**
*  Prepare Lensglue Contracts
*
*
* @class LensglueComposer
* @package    Network Library
* @copyright  Copyright (c) 2026 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import LensglueRef from '../referencecontracts/lensglueRef.js'
import events from 'events'

class LensglueComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
    this.liveLensglueContracts = new LensglueRef(this.heliLive)
  }

  /**
  * prepare and individual lensglue
  * @method lensgluePrepare
  *
  */
  lensgluePrepare(lsKey, inLensglue) {
    // 1. Ensure the agent has a name so it isn't 'undefined'
    if (!inLensglue.name) inLensglue.name = 'reson-agent-alpha';

    let lensglueContract = this.liveLensglueContracts.lensglueForm(inLensglue);
    const itemHash = this.cryptoLive.createKey(lensglueContract);

    // 2. The RAW ID Rule: Strip 'lifestrap!' if it exists
    const rawLsID = this.cryptoLive.getRawID(lsKey);

    // 3. Create the Stitch: [RAW_HASH]!link![ITEM_HASH]
    const stitchKey = this.cryptoLive.createStitchKey(rawLsID, itemHash);

    // 4. Create the Content Key: lensglue![ITEM_HASH]
    const lensContentKey = this.cryptoLive.createContentKey('lensglue', itemHash);
    
    return {
      stitchHash: stitchKey, // Named 'stitchHash' to match the saver
      contentKey: lensContentKey,
      contract: lensglueContract
    };
  }

}

export default LensglueComposer
