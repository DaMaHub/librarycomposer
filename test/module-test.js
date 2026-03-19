import { validateContract } from '../src/validation/validationUtility.js';

const testModule = {
  refcontract: 'module',
  concept: {},
  computational: {},
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid module contract...');
  validateContract('module', testModule);
  console.log('✅ Valid module contract passed.');
} catch (e) {
  console.error('❌ Valid module contract failed:', e.message);
  process.exit(1);
}
