import { describe, it, expect } from 'vitest'
import { startRealLibraryHop } from '../helpers.js'
import LibComposer from '../../src/index.js'

describe('Orgo Composer Validation', () => {
  it('should successfully validate and prepare an Orgo contract with torso details', async () => {
    const context = await startRealLibraryHop()
    const composer = new LibComposer(context)

    const torsoOrgoReferenceContract = {
      meta: {},
      data: {
        concept: { cue: '#torso' },
        emulation: {
          executable: 'hash://bafybeihorgo-tensegrity-driver-v1',
          conduction_map: {
            inputs: ['inputFlexion', 'radius', 'length'],
            outputs: ['resolvedAngle', 'systemTension']
          }
        }
      }
    }

    const result = composer.liveComposer.orgoComposer(torsoOrgoReferenceContract)

    expect(result.type).toBe('library')
    expect(result.reftype).toBe('orgo')
    expect(result.data.contract.refcontract).toBe('orgo')
    expect(result.data.contract.concept.cue).toBe('#torso')
    expect(result.data.contract.computational.executable).toBe('hash://bafybeihorgo-tensegrity-driver-v1')
    expect(result.data.contract.computational.conduction_map.inputs).toEqual(['inputFlexion', 'radius', 'length'])
    expect(result.data.contract.computational.conduction_map.outputs).toEqual(['resolvedAngle', 'systemTension'])
    expect(result.data.contract.space).toEqual({ concept: 'mind' })
    expect(result.data.contract.time.frequencyCount).toBe(0)
  })
})
