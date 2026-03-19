import { validateContract } from '../src/validation/validationUtility.js';

const testVisualise = {
  refcontract: 'visualise',
  concept: {},
  computational: { type: 'chart' },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid visualise contract...');
  validateContract('visualise', testVisualise);
  console.log('✅ Valid visualise contract passed.');
} catch (e) {
  console.error('❌ Valid visualise contract failed:', e.message);
  process.exit(1);
}
