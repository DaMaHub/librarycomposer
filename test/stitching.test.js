import { describe, it, expect, vi } from 'vitest';
import b4a from 'b4a';
import CuesComposer from '../src/composers/cuesComposer.js';
import ReferenceContractComposer from '../src/composers/rcComposer.js';

describe('Stitching (Lens) Logic', () => {
  const mockHeliLive = {
    helistamp: vi.fn(() => 1716812400000)
  };

  const mockCryptoLive = {
    createKey: vi.fn((data) => b4a.from('mock-hash-32-bytes-length-exactly')), // Mocking binary hash
    createStitchKey: vi.fn((lsKey, itemHash) => `stitched!${lsKey.toString()}!${itemHash.toString()}`),
    createContentKey: vi.fn((prefix, hash) => `${prefix}!content!${hash.toString()}`),
    createPrefixedKey: vi.fn((prefix, hash) => `${prefix}!${hash.toString()}`)
  };

  const mockContextAgent = {
    heliLocation: mockHeliLive,
    crypto: mockCryptoLive
  };

  const lsKey = b4a.from('lifestrap-key-buffer');

  describe('CuesComposer Stitching', () => {
    it('should correctly stitch a cue to a lifestrap', () => {
      const composer = new CuesComposer(mockContextAgent);
      const inCue = {
        datatype: 'steps',
        network: 'cold'
      };

      const result = composer.cueComposer(lsKey, inCue);

      expect(mockCryptoLive.createStitchKey).toHaveBeenCalledWith(lsKey, expect.any(Object));
      expect(mockCryptoLive.createContentKey).toHaveBeenCalledWith('cues', expect.any(Object));
      expect(result.hash).toContain('stitched!lifestrap-key-buffer!');
      expect(result.contentKey).toContain('cues!content!');
    });
  });

  describe('ReferenceContractComposer Datatype Stitching', () => {
    it('should correctly stitch a datatype to a lifestrap', () => {
      const composer = new ReferenceContractComposer(mockContextAgent);
      const input = {
        primary: true,
        name: 'Heart Rate',
        measurement: 'bpm',
        datatypeType: 'integer'
      };

      const result = composer.datatypeComposer(lsKey, input);

      expect(mockCryptoLive.createStitchKey).toHaveBeenCalledWith(lsKey, expect.any(Object));
      expect(mockCryptoLive.createContentKey).toHaveBeenCalledWith('datatype', expect.any(Object));
      expect(result.hash).toContain('stitched!lifestrap-key-buffer!');
      expect(result.contentKey).toContain('datatype!content!');
    });
  });
});
