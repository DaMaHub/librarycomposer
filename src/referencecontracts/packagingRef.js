'use strict'
/**
*  Prepare Packaging Reference Contracts
*
*
* @class PackagingReferenceContract
* @package    LKN health
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import { EventEmitter } from 'events';
import { validateContract } from '../validation/validationUtility.js';

class PackagingReferenceContract extends EventEmitter {
  constructor(heliLive) {
    super();
    this.heliLive = heliLive;
  }

  /**
  * prepare a packaging reference contract
  * @method packagingPrepare
  *
  */
  packagingPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const mergeDTColumn = this.mergePackageMap(inputRC.apicolumns, inputRC.apicolHolder);
    const newPackagingMap = {
      name: inputRC.name,
      description: inputRC.description,
      primary: inputRC.primary,
      api: inputRC.api,
      apibase: inputRC.apibase,
      apipath: inputRC.apipath,
      filename: inputRC.filename,
      path: inputRC.path,
      tableQuery: inputRC.tableQuery,
      sourcedevicecol: inputRC.sourcedevicecol,
      sqlitetablename: inputRC.sqlitetablename,
      tablestructure: mergeDTColumn,
      tidy: inputRC.tidy,
      category: inputRC.category,
      device: inputRC.device,
      devicesList: inputRC.devicesList,
      deviceColumns: inputRC.deviceColumns,
      devicequery: inputRC.deviceQuery,
      firmwarequery: inputRC.firmwareQuery,
      deviceColumnID: inputRC.deviceColumnID
    };

    const packagingContract = {
      refcontract: 'packaging',
      concept: newPackagingMap,
      space: { concept: 'mind' },
      computational: { refcontract: null },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('packaging', packagingContract);
  }

  /**
  * prepare a blind packaging reference contract
  * @method packagingBlindPrepare
  *
  */
  packagingBlindPrepare(inputRC) {
    const currentTime = this.heliLive ? this.heliLive.helistamp() : Date.now();
    const mergeDTColumn = [{refcontract: 'blind1234555554321'}];
    const newPackagingMap = {
      name: inputRC.name,
      description: inputRC.description,
      primary: inputRC.primary,
      api: inputRC.api,
      apibase: inputRC.apibase,
      apipath: inputRC.apipath,
      filename: inputRC.filename,
      tableQuery: inputRC.sqlitetablename,
      sourcedevicecol: inputRC.deviceColumns,
      sqlitetablename: inputRC.sqlitetablename,
      tablestructure: mergeDTColumn,
      tidy: inputRC.tidy,
      category: inputRC.category,
      device: inputRC.device,
      devicesList: inputRC.devicesList
    };

    const packagingContract = {
      refcontract: 'packaging',
      concept: newPackagingMap,
      space: { concept: 'mind' },
      computational: { refcontract: null },
      time: {
        createTimestamp: currentTime,
        lastTimestamp: currentTime,
        frequencyCount: 0
      }
    };
    
    return validateContract('packaging', packagingContract);
  }

  mergePackageMap(cols, holder) {
    // Implementation of mergePackageMap would go here
    return [];
  }
}

export default PackagingReferenceContract;
