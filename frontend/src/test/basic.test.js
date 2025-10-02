import { describe, test, expect } from 'vitest'

describe('Simple Frontend Tests', () => {
  test('basic math works', () => {
    expect(2 + 2).toBe(4)
  })

  test('string operations work', () => {
    expect('hello'.toUpperCase()).toBe('HELLO')
  })

  test('array operations work', () => {
    const arr = [1, 2, 3]
    expect(arr.length).toBe(3)
  })

  test('async test works', async () => {
    const result = await Promise.resolve('test')
    expect(result).toBe('test')
  })

  test('object operations work', () => {
    const obj = { name: 'test', value: 123 }
    expect(obj.name).toBe('test')
    expect(obj.value).toBe(123)
  })
})