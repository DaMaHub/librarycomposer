import { validateContract } from '../src/validation/validationUtility.js';

const testQuestion = {
  refcontract: 'question',
  concept: { text: 'What is the meaning of life?' },
  computational: {},
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid question contract...');
  validateContract('question', testQuestion);
  console.log('✅ Valid question contract passed.');
} catch (e) {
  console.error('❌ Valid question contract failed:', e.message);
  process.exit(1);
}
