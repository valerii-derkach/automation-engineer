const orderByTotal = require('../salesOrder');

describe('orderByTotal', () => {
  test('should correctly calculate totals and order by total', () => {
    const sales = [
      { amount: 5000, quantity: 2 },
      { amount: 20000, quantity: 10 },
      { amount: 20000, quantity: 1 }
    ];
    const expected = [
      { amount: 5000, quantity: 2, total: 10000 },
      { amount: 20000, quantity: 1, total: 20000 },
      { amount: 20000, quantity: 10, total: 200000 }
    ];
    const result = orderByTotal(sales);
    expect(result).toEqual(expected);
  });

  test('should not modify the original array', () => {
    const sales = [
      { amount: 10000, quantity: 2 },
      { amount: 5000, quantity: 10 },
      { amount: 20000, quantity: 1 }
    ];
    const original = [...sales];

    orderByTotal(sales);
    expect(sales).toEqual(original);
    });
});
