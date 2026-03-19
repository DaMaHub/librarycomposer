import { validateContract } from '../src/validation/validationUtility.js';

const testLifeboard = {
  refcontract: 'lifeboard',
  concept: { name: 'Test Lifeboard' },
  computational: { routines: 'start' },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid lifeboard contract...');
  validateContract('lifeboard', testLifeboard);
  console.log('✅ Valid lifeboard contract passed.');
} catch (e) {
  console.error('❌ Valid lifeboard contract failed:', e.message);
  process.exit(1);
}
