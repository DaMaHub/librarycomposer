'use strict'
/**
*  Prepare Product Contracts
*
*
* @class ProductContract
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class ProductContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare and individual product
  * @method productContractform
  *
  */
  productContractform(inPro) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const productContract = {
      refcontract: 'product',
      concept: inPro,
      space: { concept: 'mind' },
      computational: {},
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('product', productContract);
  }

  /**
  * prepare and individual 
  * @method ProductRelationships
  *
  */
  ProductRelationships() {
    return {};
  }
}

export default ProductContract;
