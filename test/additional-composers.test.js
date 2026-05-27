import { describe, it, expect, vi } from 'vitest';
import b4a from 'b4a';
import MediaComposer from '../src/composers/mediaComposer.js';
import ProductComposer from '../src/composers/productComposer.js';
import ResearchComposer from '../src/composers/researchComposer.js';

describe('Additional Composers (Media, Product, Research)', () => {
  const mockHeliLive = {
    helistamp: vi.fn(() => 1716812400000)
  };

  const mockCryptoLive = {
    createKey: vi.fn((data) => b4a.from('mock-hash-32-bytes-length-exactly')),
    createPrefixedKey: vi.fn((prefix, hash) => `${prefix}!${hash.toString()}`)
  };

  const mockContextAgent = {
    heliLocation: mockHeliLive,
    crypto: mockCryptoLive
  };

  it('should compose media contract', () => {
    const composer = new MediaComposer(mockContextAgent);
    const input = { name: 'Test Media' };
    const result = composer.mediaPrepare(input);
    expect(result.cueid).toBe('media!mock-hash-32-bytes-length-exactly');
    expect(result.data.refcontract).toBe('media');
  });

  it('should compose product contract', () => {
    const composer = new ProductComposer(mockContextAgent);
    const input = { data: { name: 'Test Product' } };
    const result = composer.productPrepare(input);
    expect(result.cueid).toBe('product!mock-hash-32-bytes-length-exactly');
    expect(result.data.refcontract).toBe('product');
  });

  it('should compose research contract', () => {
    const composer = new ResearchComposer(mockContextAgent);
    const input = { data: { name: 'Test Research' } };
    const result = composer.researchPrepare(input);
    expect(result.cueid).toBe('research!mock-hash-32-bytes-length-exactly');
    expect(result.data.refcontract).toBe('research');
  });
});
