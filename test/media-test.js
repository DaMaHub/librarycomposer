import { validateContract } from '../src/validation/validationUtility.js';

const testMedia = {
  refcontract: 'media',
  concept: { name: 'Test Media' },
  computational: {},
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid media contract...');
  validateContract('media', testMedia);
  console.log('✅ Valid media contract passed.');
} catch (e) {
  console.error('❌ Valid media contract failed:', e.message);
  process.exit(1);
}
