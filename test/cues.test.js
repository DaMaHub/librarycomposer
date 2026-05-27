import { describe, it, expect, vi } from 'vitest';
import b4a from 'b4a';
import CuesComposer from '../src/composers/cuesComposer.js';

describe('CuesComposer', () => {
  const mockHeliLive = {
    helistamp: vi.fn(() => 1716812400000)
  };

  const mockCryptoLive = {
    createKey: vi.fn((data) => b4a.from('mock-hash-cue')),
    createStitchKey: vi.fn((lsKey, hash) => `stitched!${lsKey.toString()}!${hash.toString()}`),
    createContentKey: vi.fn((prefix, hash) => `${prefix}!content!${hash.toString()}`)
  };

  const mockContextAgent = {
    heliLocation: mockHeliLive,
    crypto: mockCryptoLive
  };

  const lsKey = b4a.from('lifestrap-id');

  it('should correctly compose a cue contract', () => {
    const composer = new CuesComposer(mockContextAgent);
    const inCue = {
      datatype: 'heart-rate',
      network: 'warm',
      computational: {
        frequency: 1
      }
    };

    const result = composer.cueComposer(lsKey, inCue);

    expect(result.hash).toBe('stitched!lifestrap-id!mock-hash-cue');
    expect(result.contentKey).toBe('cues!content!mock-hash-cue');
    expect(result.contract.refcontract).toBe('cue');
    expect(result.contract.concept.datatype).toBe('heart-rate');
  });

  it('should handle cuesTimestamp', () => {
    const composer = new CuesComposer(mockContextAgent);
    const update = {
      key: 'cue-key',
      value: { data: 'val' }
    };
    const result = composer.cuesTimestamp(update);
    expect(result.cueid).toBe('cue-key');
    expect(result.data).toEqual({ data: 'val' });
  });
});
