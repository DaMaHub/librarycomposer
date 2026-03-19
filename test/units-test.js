import { validateContract } from '../src/validation/validationUtility.js';

const testUnitsSI = {
  refcontract: 'units',
  concept: { 
    baseUnit: 'm',
    scaleFactor: 1,
    label: 'Meter',
    references: ['https://en.wikipedia.org/wiki/Metre']
  },
  computational: { 
    refcontract: null,
    logic: 'Value * 1 = m'
  },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

const testUnitsDerived = {
  refcontract: 'units',
  concept: { 
    baseUnit: 'm',
    scaleFactor: 0.7,
    label: 'Steps'
  },
  computational: { 
    refcontract: null,
    logic: 'Value * 0.7 = m'
  },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

const testUnitsHeli = {
  refcontract: 'units',
  concept: { 
    baseUnit: 'heli',
    label: 'Solar Angle'
  },
  computational: { 
    refcontract: null,
    logic: 'Value * 1 = heli'
  },
  space: { concept: 'mind' },
  time: {
    createTimestamp: Date.now(),
    lastTimestamp: Date.now(),
    frequencyCount: 0
  }
};

try {
  console.log('Testing SI units contract...');
  validateContract('units', testUnitsSI);
  console.log('✅ SI units contract passed.');

  console.log('Testing Derived units contract (Steps)...');
  validateContract('units', testUnitsDerived);
  console.log('✅ Derived units contract passed.');

  console.log('Testing Heli units contract...');
  validateContract('units', testUnitsHeli);
  console.log('✅ Heli units contract passed.');
} catch (e) {
  console.error('❌ Units contract validation failed:', e.message);
  process.exit(1);
}
