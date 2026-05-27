import { describe, it, expect, vi } from 'vitest';
import b4a from 'b4a';
import ReferenceContractComposer from '../src/composers/rcComposer.js';

describe('ReferenceContractComposer Full Suite', () => {
  const mockHeliLive = {
    helistamp: vi.fn(() => 1716812400000)
  };

  const mockCryptoLive = {
    createKey: vi.fn((data) => b4a.from('mock-hash-32-bytes-length-exactly')),
    createPrefixedKey: vi.fn((prefix, hash) => `${prefix}!${hash.toString()}`),
    createStitchKey: vi.fn((lsKey, hash) => `stitched!${lsKey}!${hash}`),
    createContentKey: vi.fn((prefix, hash) => `${prefix}!content!${hash}`),
    evidenceProof: vi.fn((data) => 'mock-evidence-proof')
  };

  const mockContextAgent = {
    heliLocation: mockHeliLive,
    crypto: mockCryptoLive
  };

  const composer = new ReferenceContractComposer(mockContextAgent);

  describe('Standard Composers', () => {
    it('should compose orgo contract', () => {
      const input = { name: 'Test Orgo' };
      const result = composer.orgoComposer(input);
      expect(result.reftype).toBe('orgo');
      expect(result.data.hash).toBe('orgo!mock-hash-32-bytes-length-exactly');
    });

    it('should compose gelle contract', () => {
      const input = { name: 'Test Gelle' };
      const result = composer.gelleComposer(input);
      expect(result.reftype).toBe('gelle');
      expect(result.data.hash).toBe('gelle!mock-hash-32-bytes-length-exactly');
    });

    it('should compose question contract', () => {
      const input = { text: 'Test Question?' };
      const result = composer.questionComposer(input);
      expect(result.reftype).toBe('datatype'); 
      expect(result.data.hash).toBe('datatype!mock-hash-32-bytes-length-exactly');
    });

    it('should compose packaging contract', () => {
      const input = { name: 'Test Package', primary: true };
      const result = composer.packagingComposer(input);
      expect(result.reftype).toBe('packaging');
      expect(result.data.hash).toBe('packaging!mock-hash-32-bytes-length-exactly');
    });

    it('should compose compute contract', () => {
      const input = { algorithm: 'test-algo' };
      const result = composer.computeComposer(input);
      expect(result.reftype).toBe('compute');
      expect(result.data.hash).toBe('compute!mock-hash-32-bytes-length-exactly');
    });

    it('should compose visualise contract', () => {
      const input = { 
        experimentId: 'exp-123',
        scales: {
          cell: {
            component: 'TestCell',
            resonanceMapping: { targetProperty: 'alpha' }
          }
        }
      };
      const result = composer.visualiseComposer(input);
      expect(result.reftype).toBe('visualise');
      expect(result.data.hash).toBe('visualise!mock-hash-32-bytes-length-exactly');
    });
  });

  describe('Complex/Multi-step Composers', () => {
    it('should compose module contract (genesis)', () => {
      const input = { name: 'Test Module' };
      const result = composer.moduleComposer(input, 'genesis');
      expect(result.refcontract).toBe('module');
    });

    it('should compose experiment contract (genesis)', () => {
      const input = { state: 'genesis' };
      const result = composer.experimentComposerGenesis(input);
      expect(result.refcontract).toBe('experiment');
    });

    it('should compose units contract', () => {
      const input = { label: 'Meter', baseUnit: 'm' };
      const result = composer.unitsComposer(input);
      expect(result.type).toBe('library');
      expect(result.reftype).toBe('units');
      expect(result.data.hash).toBe('mock-evidence-proof');
    });

    it('should compose lifeboard contract (new)', () => {
      const input = { name: 'Test Lifeboard' };
      const result = composer.lifeboardComposer(input, 'new');
      expect(result.refcontract).toBe('lifeboard');
    });
  });
});
