import { describe, test, expect, vi } from 'vitest';
import { getHumanDate } from './getHumanDate.js';

describe('getHumanDate', () => {
  test('функция существует', () => {
    expect(typeof getHumanDate).toBe('function');
  });

  test('возвращает строку для даты', () => {
    const result = getHumanDate('2023-12-25');
    expect(typeof result).toBe('string');
  });

  test('работает без аргументов', () => {
    const result = getHumanDate();
    expect(typeof result).toBe('string');
  });
});