# Plan: Datatype Form Reference Contract Tests

This plan outlines the steps to create a test suite for the `datatype` reference contract formation, focusing on the structure of the key and the content of the value.

## 1. Analysis
- **`DatatypeReferenceContract.dtContractform(inputRC)`**:
    - Takes an `inputRC` object.
    - Adds `refcontract: 'datatype'`, `space`, and `time` (using `heliLive.helistamp()`).
    - Validates the contract using `validateContract`.
- **`ReferenceContractComposer.datatypeComposer(input)`**:
    - Calls `dtContractform`.
    - Generates a hash using `cryptoLive.createKey(prepContract)`.
    - Wraps the contract in a `RefContractHolder` with metadata (`type`, `action`, `privacy`, `reftype`, `task`).
    - Sets `data.hash` using `cryptoLive.createPrefixedKey('datatype', dtHASH)`.
    - Sets `data.contract` to the prepared contract.

## 2. Test Strategy
We will use a test runner (likely `node --test` or similar, based on the project structure) to:
1.  **Mock Dependencies**: Create mock objects for `heliLive` (to return a fixed timestamp) and `cryptoLive` (to return predictable hashes).
2.  **Test `dtContractform`**:
    - Verify that the returned contract contains all expected fields (`refcontract`, `concept`, `computational`, `space`, `time`).
    - Verify that the `concept` and `computational` fields match the input.
3.  **Test `datatypeComposer`**:
    - Verify the structure of the `RefContractHolder`.
    - **Key Structure**: Check that `data.hash` starts with the correct prefix (e.g., `datatype-`).
    - **Value Content**: Check that `data.contract` is identical to the output of `dtContractform`.

## 3. Proposed Test Draft (`test/formcontract/datatype-form.test.js`)

```javascript
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
  });

  it('should correctly compose the contract via ReferenceContractComposer', () => {
    const composer = new ReferenceContractComposer(mockContextAgent);
    const result = composer.datatypeComposer(inputData);

    // Check structure
    expect(result.type).toBe('library');
    expect(result.reftype).toBe('datatype');

    // Check key structure
    expect(result.data.hash).toBe('datatype-mock-hash');
    expect(mockCryptoLive.createPrefixedKey).toHaveBeenCalledWith('datatype', 'mock-hash');

    // Check value content
    expect(result.data.contract.concept.name).toBe('Heart Rate');
    expect(result.data.contract.computational.measurement).toBe('bpm');
  });
});
```

## 4. Next Steps
1.  Confirm if the mock implementations for `heliLive` and `cryptoLive` are acceptable.
2.  Verify the expected prefix format for the key (e.g., is it `datatype-` or something else?).
3.  Implement the tests in the target file.
