import { describe, expect, it } from 'vitest'

import { omit } from './omit'

describe('omit', () => {
  it('should remove the specified keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3 }

    const result = omit(obj, ['b', 'c'])

    expect(result).toEqual({ a: 1 })
  })

  it('should not modify the original object', () => {
    const obj = { a: 1, b: 2, c: 3 }

    omit(obj, ['b', 'c'])

    expect(obj).toEqual({ a: 1, b: 2, c: 3 })
  })
})
