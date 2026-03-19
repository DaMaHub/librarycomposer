import { validateContract } from '../src/validation/validationUtility.js';

const testDatatype = {
  refcontract: 'datatype',
  concept: {
    primary: 'yes',
    name: 'Heart Rate',
    description: 'Beats per minute',
    wiki: 'https://en.wikipedia.org/wiki/Heart_rate',
    rdf: 'https://dbpedia.org/page/Heart_rate'
  },
  computational: {
    measurement: 'bpm',
    datatypeType: 'integer'
  },
  space: {
    concept: 'mind'
  },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing valid datatype contract...');
  validateContract('datatype', testDatatype);
  console.log('✅ Valid datatype contract passed.');
} catch (e) {
  console.error('❌ Valid datatype contract failed:', e.message);
}

const invalidDatatype = {
  refcontract: 'datatype',
  concept: {
    primary: 'maybe', // Invalid enum
    name: 'Heart Rate'
  },
  computational: {
    measurement: 'bpm'
    // Missing datatypeType
  },
  space: {
    concept: 'mind'
  },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('\nTesting invalid datatype contract...');
  validateContract('datatype', invalidDatatype);
  console.error('❌ Invalid datatype contract passed (it should have failed).');
} catch (e) {
  console.log('✅ Invalid datatype contract correctly failed:', e.message);
}
