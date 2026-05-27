import { describe, it, expect, vi } from 'vitest';
import LifestrapComposer from '../src/composers/lifestrapComposer.js';

describe('LifestrapComposer', () => {
  const mockHeliLive = {
    helistamp: vi.fn(() => 1716812400000)
  };

  const mockCryptoLive = {
    createKey: vi.fn((data) => 'mock-hash-lifestrap'),
    createPrefixedKey: vi.fn((prefix, hash) => `${prefix}!${hash}`)
  };

  const mockContextAgent = {
    heliLocation: mockHeliLive,
    crypto: mockCryptoLive
  };

  it('should correctly prepare a lifestrap contract', () => {
    const composer = new LifestrapComposer(mockContextAgent);
    const input = {
      data: {
        inquiry: 'What is the goal of this project?'
      }
    };

    const result = composer.lifestrapPrepare(input);

    // Verify hashing and indexing
    expect(mockCryptoLive.createKey).toHaveBeenCalled();
    expect(mockCryptoLive.createPrefixedKey).toHaveBeenCalledWith('lifestrap', 'mock-hash-lifestrap');

    expect(result.id).toBe('mock-hash-lifestrap');
    expect(result.key).toBe('lifestrap!mock-hash-lifestrap');

    // Verify contract content
    expect(result.contract.refcontract).toBe('lifestrap');
    expect(result.contract.concept.story).toBe('What is the goal of this project?');
    expect(result.contract.time.createTimestamp).toBe(1716812400000);
  });

  it('should correctly handle lifestrapTimestamp', () => {
    const composer = new LifestrapComposer(mockContextAgent);
    const update = {
      key: 'lifestrap!some-hash',
      value: { some: 'data' }
    };

    const result = composer.lifestrapTimestamp(update);
    expect(result.lifestrapid).toBe('lifestrap!some-hash');
    expect(result.data).toEqual({ some: 'data' });
  });
});
