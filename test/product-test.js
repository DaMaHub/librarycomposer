import { validateContract } from '../src/validation/validationUtility.js';

const testProduct = {
  refcontract: 'product',
  concept: { name: 'Test Product' },
  computational: {},
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid product contract...');
  validateContract('product', testProduct);
  console.log('✅ Valid product contract passed.');
} catch (e) {
  console.error('❌ Valid product contract failed:', e.message);
  process.exit(1);
}
