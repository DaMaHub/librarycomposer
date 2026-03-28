import { describe, it, expect, vi } from 'vitest';
import DatatypeReferenceContract from '../../src/referencecontracts/datatypeRef.js';
import ReferenceContractComposer from '../../src/composers/rcComposer.js';

describe('Datatype Form Reference Contract', () => {
  // Mock heliLive
  const mockHeliLive = {
    helistamp: vi.fn(() => 1234567890)
  };

  // Mock cryptoLive
  const mockCryptoLive = {
    createKey: vi.fn((data) => 'mock-hash'),
    createPrefixedKey: vi.fn((prefix, hash) => `${prefix}-${hash}`)
  };

  const mockContextAgent = {
    heliclock: mockHeliLive,
    crypto: mockCryptoLive
  };

  const inputData = {
    primary: 'yes',
    name: 'Heart Rate',
    description: 'Beats per minute',
    wiki: 'https://en.wikipedia.org/wiki/Heart_rate',
    rdf: 'https://dbpedia.org/page/Heart_rate',
    computational: {
      measurement: 'bpm',
      datatypeType: 'integer'
    }
  };

  it('should correctly form the datatype contract via DatatypeReferenceContract', () => {
    const dtRef = new DatatypeReferenceContract(mockHeliLive);
    const prepared = dtRef.dtContractform(inputData);
    expect(prepared.refcontract).toBe('datatype');
    expect(prepared.concept.name).toBe('Heart Rate');
    expect(prepared.time.createTimestamp).toBe(1234567890);
    expect(prepared.computational.measurement).toBe('bpm');
    expect(prepared.computational.datatypeType).toBe('integer');
  });

  it('should correctly compose the contract via ReferenceContractComposer', () => {
    const composer = new ReferenceContractComposer(mockContextAgent);
    const result = composer.datatypeComposer(inputData);

    // Check structure
    expect(result.type).toBe('library');
    expect(result.action).toBe('contracts');
    expect(result.privacy).toBe('public');
    expect(result.reftype).toBe('datatype');
    expect(result.task).toBe('PUT');

    // Check key structure
    expect(result.data.hash).toBe('datatype-mock-hash');
    expect(mockCryptoLive.createPrefixedKey).toHaveBeenCalledWith('datatype', 'mock-hash');

    // Check value content
    expect(result.data.contract.concept.name).toBe('Heart Rate');
    expect(result.data.contract.computational.measurement).toBe('bpm');
    expect(result.data.contract.computational.datatypeType).toBe('integer');
  });
});
