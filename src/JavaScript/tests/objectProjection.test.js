const objectProjection = require('../objectProjection');

describe('objectProjection', () => {
  test('correctly projects properties as specified in the prototype, including nested structures', () => {
    const src = {
      prop11: {
        prop21: 21,
        prop22: {
          prop31: 31,
          prop32: 32
        }
      },
      prop12: 12
    };

    const proto = {
      prop11: {
        prop22: null
      }
    };

    const expected = {
      prop11: {
        prop22: {
          prop31: 31,
          prop32: 32
        }
      }
    };

    const result = objectProjection(src, proto);
    expect(result).toEqual(expected);
  });

  test('ignores keys in the prototype that are not present in the source', () => {
    const src = {
      prop11: {
        prop21: 21
      }
    };
  
    const proto = {
      prop11: {
        prop21: null,
        prop22: null
      },
      prop13: null
    };
  
    const expected = {
      prop11: {
        prop21: 21
      }
    };
  
    const result = objectProjection(src, proto);
    expect(result).toEqual(expected);
  });
  
  test('handles empty source or prototype objects', () => {
    const src = {};
    const proto = {
      prop1: null
    };
  
    const expected = {};
    const result = objectProjection(src, proto);
    expect(result).toEqual(expected);
  });

  test('returns an empty object if the source is not an object', () => {
    const src = null;
    const proto = {
      prop1: null
    };
  
    const expected = {};
    const result = objectProjection(src, proto);
    expect(result).toEqual(expected);
  });
  
  test('returns an empty object if the prototype is not an object', () => {
    const src = {
      prop1: 'value'
    };
    const proto = null;
  
    const expected = {};
    const result = objectProjection(src, proto);
    expect(result).toEqual(expected);
  });
  
});