import { validateContract } from '../src/validation/validationUtility.js';

const testResearch = {
  refcontract: 'research',
  concept: { name: 'Test Research' },
  computational: {},
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid research contract...');
  validateContract('research', testResearch);
  console.log('✅ Valid research contract passed.');
} catch (e) {
  console.error('❌ Valid research contract failed:', e.message);
  process.exit(1);
}
