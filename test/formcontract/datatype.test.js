import { describe, it, expect } from 'vitest'
import { startRealLibraryHop } from '../helpers.js'
import LibComposer from '../../src/index.js'

describe('Datatype Composer: First Principles', () => {
  it('should form deterministic Stitch and Content keys', async () => {
    // 1. Get the context agents from your helper
    const context = await startRealLibraryHop()

    // 2. Instantiate the composer directly
    const composer = new LibComposer(context)
       
    // 3. Define the test inputs
    const lsKey = 'common!'
    const inputData = {
      primary: 'yes',
      name: 'Heart Rate',
      description: 'Beats per minute',
      measurement: '',
      datatypeType: ''
    }

    // 4. Form the contracts
    const result = composer.liveComposer.datatypeComposer(lsKey, inputData)

    // 5. Assertions on the index structure
    // Check Content Key format: 'datatype![hash]'
    const contentKey = result.contentKey
    expect(contentKey.slice(0, 9).toString()).toBe('datatype!')
    expect(contentKey.length).toBe(9 + 32)

    // Check Stitch Key format: '[rawLsID]!link![hash]'
    // This is the critical relational synapse
    const stitchKey = result.hash
    const stitchString = stitchKey.toString()
    expect(stitchString).toContain('!link!')
    
    // 6. Final verification of hash symmetry
    // Both keys MUST point to the same content identity
    const hashA = stitchKey.slice(-32)
    const hashB = contentKey.slice(-32)
    expect(hashA.equals(hashB)).toBe(true)
  })

  /*it('should pass validation even when optional fields are empty strings', async () => {
    const context = await startRealLibraryHop()
    const composer = new LibComposer(context)
    const lsKey = 'common!'

    const inputData = {
      primary: 'yes',
      name: 'dd',
      description: 'dd',
      wiki: '',
      rdf: '',
      measurement: '',
      datatypeType: ''
    }

    const result = composer.liveComposer.datatypeComposer(lsKey, inputData)
    expect(result.contract.concept.name).toBe('dd')
    expect(result.contract.computational.datatypeType).toBeUndefined()
    expect(result.contract.computational.measurement).toBeUndefined()
  })*/
})