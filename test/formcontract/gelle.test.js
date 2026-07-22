import { describe, it, expect } from 'vitest'
import { startRealLibraryHop } from '../helpers.js'
import LibComposer from '../../src/index.js'

describe('Gelle Composer Validation', () => {
  it('should successfully validate and prepare a Gelle contract with torso details', async () => {
    const context = await startRealLibraryHop()
    const composer = new LibComposer(context)

    const torsoGelleReferenceContract = {
      meta: {},
      data: {
        concept: { cue: '#torso' },
        emulation: {
          executable: 'hash://bafybeicgelle-prolate-hull-v1',
          conduction_map: {
            inputs: ['radius', 'length'],
            outputs: ['meshPoints']
          }
        }
      }
    }

    const result = composer.liveComposer.gelleComposer(torsoGelleReferenceContract)

    expect(result.type).toBe('library')
    expect(result.reftype).toBe('gelle')
    expect(result.data.contract.refcontract).toBe('gelle')
    expect(result.data.contract.concept.cue).toBe('#torso')
    expect(result.data.contract.computational.executable).toBe('hash://bafybeicgelle-prolate-hull-v1')
    expect(result.data.contract.computational.conduction_map.inputs).toEqual(['radius', 'length'])
    expect(result.data.contract.computational.conduction_map.outputs).toEqual(['meshPoints'])
    expect(result.data.contract.space).toEqual({ concept: 'mind' })
    expect(result.data.contract.time.frequencyCount).toBe(0)
  })
})
