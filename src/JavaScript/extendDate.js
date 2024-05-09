Date.prototype.daysTo = function(d2) {
  if (!(d2 instanceof Date) || isNaN(d2.getTime())) {
    return { error: 'The provided argument is not a valid Date object.' };
  }

  if (d2 < this) {
    return { error: 'The second date must be later than the first date.' };
  }

  const differenceInMilliseconds = d2 - this;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.floor(differenceInMilliseconds / millisecondsPerDay);
};
