import { validateContract } from '../src/validation/validationUtility.js';

const testCompute = {
  refcontract: 'compute',
  concept: {},
  computational: { algorithm: 'test-algo' },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid compute contract...');
  validateContract('compute', testCompute);
  console.log('✅ Valid compute contract passed.');
} catch (e) {
  console.error('❌ Valid compute contract failed:', e.message);
  process.exit(1);
}
