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
    createPrefixedKey: vi.fn((prefix, hash) => `${prefix}-${hash}`),
    createStitchKey: vi.fn((lsKey, hash) => `stitched-${lsKey}-${hash}`),
    createContentKey: vi.fn((prefix, hash) => `content-${prefix}-${hash}`)
  };

  const mockContextAgent = {
    heliLocation: mockHeliLive,
    crypto: mockCryptoLive
  };

  const inputData = {
    primary: true,
    name: 'Heart Rate',
    description: 'Beats per minute',
    wiki: 'https://en.wikipedia.org/wiki/Heart_rate',
    rdf: 'https://dbpedia.org/page/Heart_rate',
    measurement: 'bpm',
    datatypeType: 'integer'
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
    const lsKey = 'mock-ls-key';
    const result = composer.datatypeComposer(lsKey, inputData);

    // Check structure
    expect(result.hash).toBe('stitched-mock-ls-key-mock-hash');
    expect(result.contentKey).toBe('content-datatype-mock-hash');
    expect(result.contract.concept.name).toBe('Heart Rate');
  });
});
