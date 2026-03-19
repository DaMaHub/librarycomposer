import { validateContract } from '../src/validation/validationUtility.js';

const testMarker = {
  refcontract: 'marker',
  concept: { 
    name: 'Test Marker',
    url: 'https://example.com/marker'
  },
  computational: {},
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid marker contract...');
  validateContract('marker', testMarker);
  console.log('✅ Valid marker contract passed.');
} catch (e) {
  console.error('❌ Valid marker contract failed:', e.message);
  process.exit(1);
}
