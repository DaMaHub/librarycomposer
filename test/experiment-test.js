import { validateContract } from '../src/validation/validationUtility.js';

const testExperiment = {
  refcontract: 'experiment',
  concept: { state: 'genesis' },
  computational: { refcontract: null },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid experiment contract...');
  validateContract('experiment', testExperiment);
  console.log('✅ Valid experiment contract passed.');
} catch (e) {
  console.error('❌ Valid experiment contract failed:', e.message);
  process.exit(1);
}
