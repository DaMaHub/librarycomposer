import * as validate from './validate.js';

export function validateContract(contractType, contract) {
  const validator = validate[contractType];
  if (!validator) {
    throw new Error(`No validator found for contract type: ${contractType}`);
  }

  const isValid = validator(contract);
  if (!isValid) {
    const errors = validator.errors;
    throw new Error(`Validation failed for ${contractType} contract: ${JSON.stringify(errors)}`);
  }

  return contract;
}
