# Refactor Plan: LibraryLib and Composers

## Objective
Refactor `src/index.js` and all composer modules to enforce a standard for all contract types by utilizing `contextAgent` for cryptographic operations and timestamps, replacing the deleted `cryptoUtility`.

## Goals
1. **Code Readability and Maintainability**: Migrate from ES5 prototype-based classes (`var ClassName = function() { ... }; util.inherits(...)`) to modern ES6 `class` syntax (`class ClassName extends EventEmitter { ... }`).
2. **Performance Optimization**: Avoid redundant imports and instantiations of cryptographic libraries by passing a single `contextAgent` instance down to all composers.
3. **Best Practices and Patterns**: Enforce dependency injection by requiring `contextAgent` to be passed to the `LibraryLib` constructor and subsequently to all composer constructors.
4. **Error Handling and Edge Cases**: Add validation in the `LibraryLib` constructor to ensure `contextAgent` is provided and contains the required `crypto` and `heliclock` properties before initializing the composers.

## Action Items

### 1. Refactor `src/index.js`
- Convert `LibraryLib` to an ES6 class extending `EventEmitter`.
- Add validation in the constructor:
  ```javascript
  if (!contextAgent || !contextAgent.crypto || !contextAgent.heliclock) {
    throw new Error('contextAgent with crypto and heliclock properties is required');
  }
  ```
- Remove `util.inherits(LibraryLib, events.EventEmitter)`.

### 2. Refactor Composers
Update the following files:
- `src/composers/cuesComposer.js`
- `src/composers/modelComposer.js`
- `src/composers/mediaComposer.js`
- `src/composers/researchComposer.js`
- `src/composers/markerComposer.js`
- `src/composers/productComposer.js`
- `src/composers/kbidComposer.js`
- `src/composers/rcComposer.js`

**Changes for each composer:**
- Convert to ES6 class syntax extending `EventEmitter`.
- Update the constructor to accept `contextAgent`.
- Remove direct imports of `Encryption` from `hop-crypto/encryption`.
- Assign `this.cryptoLive = contextAgent.crypto` and `this.heliLive = contextAgent.heliclock`.
- Ensure all key generation and timestamping within the composer methods use `this.cryptoLive` and `this.heliLive` respectively.
- Remove `util.inherits(..., events.EventEmitter)`.

### 3. Refactor `src/rcUtility.js` (if applicable)
- Ensure `RcUtility` also follows the ES6 class syntax and properly utilizes `contextAgent` if it doesn't already.
