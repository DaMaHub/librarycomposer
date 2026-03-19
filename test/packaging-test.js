import { validateContract } from '../src/validation/validationUtility.js';

const testPackaging = {
  refcontract: 'packaging',
  concept: { 
    name: 'Test Package',
    primary: 'yes'
  },
  computational: { refcontract: null },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid packaging contract...');
  validateContract('packaging', testPackaging);
  console.log('✅ Valid packaging contract passed.');
} catch (e) {
  console.error('❌ Valid packaging contract failed:', e.message);
  process.exit(1);
}
