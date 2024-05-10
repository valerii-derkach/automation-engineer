const getPublicCalendarEvents = require('./calendarAPI');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseDate(input) {
  const trimmedInput = input.trim();
  const timestamp = Date.parse(trimmedInput);
  if (isNaN(timestamp)) {
    console.error('Invalid date format. Please use ISO format (YYYY-MM-DDTHH:mm:ss.sss)');
    return null;
  }

  return new Date(timestamp);
}

rl.question('Enter Google Calendar ID:', (input) => {
  const calendarId = input.trim();
  if (!calendarId) {
    console.error('Calendar ID cannot be empty.');
    rl.close();

    return;
  }

  rl.question('Enter the start date/time in ISO format (e.g., 2024-01-01T00:00:00):', (startInput) => {
    const timeMin = parseDate(startInput);
    if (!timeMin) {
      rl.close();

      return;
    }

    rl.question('Enter the end date/time in ISO format (e.g., 2024-01-31T23:59:59):', (endInput) => {
      const timeMax = parseDate(endInput);
      if (!timeMax) {
        rl.close();

        return;
      }

      getPublicCalendarEvents(calendarId, timeMin, timeMax)
        .then(busyIntervals => {
          console.log('Busy intervals:', busyIntervals);
          rl.close();
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          rl.close();
        });
    });
  });
});
