require('../extendDate');

describe('Date.prototype.daysTo', () => {
  test('two full days', () => {
    const d1 = new Date('2024-05-09T00:00:00Z');
    const d2 = new Date('2024-05-11T00:00:00Z');
    expect(d1.daysTo(d2)).toBe(2);
  });

  test('more than one day but less than two full days', () => {
    const d1 = new Date('2024-05-09T10:00:05');
    const d2 = new Date('2024-05-11T09:59:59');
    expect(d1.daysTo(d2)).toBe(1);
  });

  test('zero days when the dates are the same', () => {
    const d1 = new Date('2024-05-10T12:00:00Z');
    const d2 = new Date('2024-05-10T12:00:00Z');
    expect(d1.daysTo(d2)).toBe(0);
  });

  test('invalid date input', () => {
    const d1 = new Date('2024-05-10T10:00:00Z');
    const invalidDate = new Date('not a date');
    const result = d1.daysTo(invalidDate);
    expect(result.error).toBe('The provided argument is not a valid Date object.');
  });

  test('returns an error if the second date is earlier', () => {
    const d1 = new Date('2024-05-10T00:00:00Z');
    const d2 = new Date('2023-05-10T00:00:00Z');
    const result = d1.daysTo(d2);

    expect(result.error).toBe('The second date must be later than the first date.');
  });
});
