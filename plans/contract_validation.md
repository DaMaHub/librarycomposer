# Contract Validation Architecture Plan

## Objective
Implement a robust, consistent contract validation routine across all contract types (both `contracttemplate` and `referencecontracts`) to ensure data integrity before contracts are hashed and stored.

## Proposed Approach: Schema-Based Validation with AJV (Standalone Mode)

The chosen approach is to use **AJV** (Another JSON Schema Validator) in **Standalone Mode**. This means we will define JSON schemas for each contract type, compile them into a standalone JavaScript module during a build step, and use that generated module at runtime. This avoids having `ajv` as a runtime dependency and improves performance.

### 1. Install Dependencies
Install `ajv` and `ajv-formats` as development dependencies.
`npm install --save-dev ajv ajv-formats ajv-cli` (or a custom build script).

### 2. Define JSON Schemas
Create a new directory `src/schemas/` to hold JSON schemas.
We will analyze the forms in `bentoboxds/src/components/library/contracts/contribute/forms/` to accurately define the structure of `concept`, `computational`, `space`, and `time` for each contract type.

Example schemas to create:
- `datatype.json`
- `marker.json`
- `cues.json`
- `media.json`
- `product.json`
- `research.json`
- `compute.json`
- `experiment.json`
- `lifeboard.json`
- `module.json`
- `packaging.json`
- `question.json`
- `units.json`
- `visualise.json`

### 3. Compile Schemas (Standalone Mode)
Create a build script (e.g., `scripts/compile-schemas.js`) that uses `ajv` to compile all schemas into a single validation module (e.g., `src/validation/validate.js`).
Update `package.json` to include a `build:schemas` script that runs this compilation step.

### 4. Integrate Validation into Contract Templates
Update each contract template (e.g., `cuesContract.js`, `markerContract.js`) and reference contract (e.g., `datatypeRef.js`) to import the generated validation module and validate the contract object right before returning it.

```javascript
// Example in cuesContract.js
import validate from '../validation/validate.js';

cuesContractform(cue) {
  const contract = {
    refcontract: 'cue',
    // ... other fields
  };
  
  // Validate before returning
  const isValid = validate('cue', contract);
  if (!isValid) {
    throw new Error(`Invalid cue contract: ${JSON.stringify(validate.errors)}`);
  }
  return contract;
}
```

### 5. Error Handling
Ensure that the composers (e.g., `cuesComposer.js`) or the calling functions handle validation errors gracefully, preventing invalid contracts from being processed further.

## Form Analysis
The schemas will be based on the forms found in `bentoboxds/src/components/library/contracts/contribute/forms/`.
For example, `newDatatype.vue` defines fields like `primary`, `name`, `description`, `wiki`, `rdf`, `measurement`, and `datatypeType`. These will map to the `concept` and `computational` properties of the `datatype` contract schema.
