function objectProjection(src, proto) {
  const result = {};

  if (!src || typeof src !== 'object' || !proto || typeof proto !== 'object') {
    console.log('Source or prototype is not a valid object.');

    return result;
  }

  for (const key in proto) {
    if (!src.hasOwnProperty(key)) {

      continue;
    }

    if (proto[key] !== null && typeof proto[key] === 'object') {
      result[key] = objectProjection(src[key], proto[key]);
    } else {
      result[key] = src[key];
    }
  };

  return result;
}

module.exports = objectProjection;
