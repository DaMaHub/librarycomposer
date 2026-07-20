'use strict'
/**
*  Prepare Cues Contracts
*
*
* @class CuesComposer
* @package    HOP health
* @copyright  Copyright (c) 2024 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import events from 'events'

class FileComposer extends events.EventEmitter {
  constructor(contextAgent) {
    super()
    this.cryptoLive = contextAgent.crypto
    this.heliLive = contextAgent.heliLocation
  }

  /**
   * Generate a deterministic path for Hyperdrive storage
   * Ensures the file structure matches the hash-based indexing
   */
  getBlobPath(fileHash, extension) {
    // We use the first 4 chars of the hash as a folder shard 
    const filePath = `/${extension}/${fileHash.toString('hex')}.${extension}`;
    return filePath
  }
  
  /**
   * Generates the triplet indexing metadata required for Orgo/Gelle logic files
   */
  prepareBlobIndex(mimeType, fileData, extension) {
    console.log('loaded file COMPOSER  LC')
    console.log(fileData)
    // 1. The Content Hash: Hash the file content (BLAKE3). This is your FILE_HASH.
    const fileHash = this.cryptoLive.createKey(fileData.content);
    console.log('filfe hash formed')
    console.log(fileHash)
    const blobPath = this.getBlobPath(fileHash, extension);
    
    const metaData = {
        name: fileData.name,
        mime: mimeType,
        path: blobPath,
        size: fileData.content.length
    };
    
    return {
        fileHash,
        blobPath,
        metaData
    };
  }

}

export default FileComposer