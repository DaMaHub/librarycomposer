import { describe, it, expect, vi } from 'vitest';
import b4a from 'b4a';
import ReferenceContractComposer from '../src/composers/rcComposer.js';

describe('ReferenceContractComposer (Datatype)', () => {
  const mockHeliLive = {
    helistamp: vi.fn(() => 1716812400000)
  };

  const mockCryptoLive = {
    createKey: vi.fn((data) => b4a.from('mock-hash-dt')),
    createStitchKey: vi.fn((lsKey, hash) => `stitched!${lsKey.toString()}!${hash.toString()}`),
    createContentKey: vi.fn((prefix, hash) => `${prefix}!content!${hash.toString()}`),
    createPrefixedKey: vi.fn((prefix, hash) => `${prefix}!${hash.toString()}`)
  };

  const mockContextAgent = {
    heliLocation: mockHeliLive,
    crypto: mockCryptoLive
  };

  const lsKey = b4a.from('lifestrap-id');

  it('should correctly compose a datatype contract', () => {
    const composer = new ReferenceContractComposer(mockContextAgent);
    const input = {
      primary: true,
      name: 'Blood Pressure',
      description: 'Systolic/Diastolic',
      measurement: 'mmHg',
      datatypeType: 'string'
    };

    const result = composer.datatypeComposer(lsKey, input);

    expect(result.hash).toBe('stitched!lifestrap-id!mock-hash-dt');
    expect(result.contentKey).toBe('datatype!content!mock-hash-dt');
    expect(result.contract.refcontract).toBe('datatype');
    expect(result.contract.concept.name).toBe('Blood Pressure');
  });

  it('should throw error for invalid datatype', () => {
    const composer = new ReferenceContractComposer(mockContextAgent);
    const invalidInput = {
      primary: 'not-a-boolean', // Should be boolean per schema
      name: 'Invalid',
      datatypeType: 'invalid-type' // Enum failure
    };

    expect(() => composer.datatypeComposer(lsKey, invalidInput)).toThrow();
  });
});
