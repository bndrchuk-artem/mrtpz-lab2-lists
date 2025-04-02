import { describe, expect, test } from 'vitest';
import { ArrayList } from './arrayList.js';

describe('ArrayList', () => {
  test('should initialize empty list', () => {
    const list = new ArrayList();
    expect(list.length()).toBe(0);
  });

  test('should append elements', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    expect(list.length()).toBe(2);
    expect(list.get(0)).toBe('a');
    expect(list.get(1)).toBe('b');
  });

  test('should throw when appending non-character', () => {
    const list = new ArrayList();
    expect(() => list.append('ab')).toThrow();
    expect(() => list.append(1)).toThrow();
  });
  
  test('should insert elements', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('c');
    list.insert('b', 1);
    expect(list.length()).toBe(3);
    expect(list.get(1)).toBe('b');
  });
  
  test('should throw when inserting at invalid index', () => {
    const list = new ArrayList();
    expect(() => list.insert('a', -1)).toThrow();
    expect(() => list.insert('a', 1)).toThrow();
  });

  test('should delete elements by index', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    list.append('c');
    const deleted = list.delete(1);
    expect(deleted).toBe('b');
    expect(list.length()).toBe(2);
  });

  test('should throw when deleting at invalid index', () => {
    const list = new ArrayList();
    expect(() => list.delete(-1)).toThrow();
    expect(() => list.delete(0)).toThrow();
  });

  test('should delete all occurrences of element', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    list.append('a');
    list.append('c');
    list.deleteAll('a');
    expect(list.length()).toBe(2);
    expect(list.get(0)).toBe('b');
    expect(list.get(1)).toBe('c');
  });

  test('should get elements by index', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    expect(list.get(0)).toBe('a');
    expect(list.get(1)).toBe('b');
  });

  test('should throw when getting at invalid index', () => {
    const list = new ArrayList();
    expect(() => list.get(-1)).toThrow();
    expect(() => list.get(0)).toThrow();
  });

  test('should clone the list', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    const clone = list.clone();
    expect(clone.length()).toBe(2);
    expect(clone.get(0)).toBe('a');
    expect(clone.get(1)).toBe('b');
  });

  test('should reverse the list', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    list.append('c');
    list.reverse();
    expect(list.get(0)).toBe('c');
    expect(list.get(1)).toBe('b');
    expect(list.get(2)).toBe('a');
  });

  test('should find first occurrence', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    list.append('a');
    expect(list.findFirst('a')).toBe(0);
    expect(list.findFirst('b')).toBe(1);
    expect(list.findFirst('c')).toBe(-1);
  });

  test('should find last occurrence', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    list.append('a');
    expect(list.findLast('a')).toBe(2);
    expect(list.findLast('b')).toBe(1);
    expect(list.findLast('c')).toBe(-1);
  });

  test('should clear the list', () => {
    const list = new ArrayList();
    list.append('a');
    list.append('b');
    list.clear();
    expect(list.length()).toBe(0);
  });

  test('should extend the list', () => {
    const list1 = new ArrayList();
    list1.append('a');
    list1.append('b');
    
    const list2 = new ArrayList();
    list2.append('c');
    list2.append('d');
    
    list1.extend(list2);
    expect(list1.length()).toBe(4);
    expect(list1.get(2)).toBe('c');
    expect(list1.get(3)).toBe('d');
  });
});