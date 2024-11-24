import { describe, expect, it } from 'vitest'

import { isPath } from './assertions'

describe('isPath', () => {
  it('should return false for empty string', () => {
    expect(isPath('')).toBe(false)
  })

  it('should return true for valid path', () => {
    expect(isPath('/root/folder/file.txt')).toBe(true)
  })

  it('should return false for invalid path with trailing slash', () => {
    expect(isPath('/root/folder/file.txt/')).toBe(false)
  })

  it('should return false for invalid path with double leading slash', () => {
    expect(isPath('//root/folder/file.txt')).toBe(false)
  })

  it('should return false for path with invalid characters', () => {
    expect(isPath('/root/folder/file.txt?query=value')).toBe(false)
  })

  it('should return true for paths with spaces', () => {
    expect(isPath('/root/folder/file with spaces.txt')).toBe(true)
  })
})
