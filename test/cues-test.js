import { validateContract } from '../src/validation/validationUtility.js';

const testCue = {
  refcontract: 'cue',
  concept: { name: 'Test Cue' },
  computational: {},
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid cue contract...');
  validateContract('cue', testCue);
  console.log('✅ Valid cue contract passed.');
} catch (e) {
  console.error('❌ Valid cue contract failed:', e.message);
  process.exit(1);
}
