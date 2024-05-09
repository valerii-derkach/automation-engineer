const getPublicCalendarEvents = require('./calendarAPI');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseDate(input) {
  const timestamp = Date.parse(input);
  if (isNaN(timestamp)) {
    console.error('Invalid date format. Please use ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)');
    return null;
  }

  return new Date(timestamp);
}

rl.question('Enter Google Calendar ID:', (calendarId) => {
  if (!calendarId) {
    console.error('Calendar ID cannot be empty.');
    rl.close();

    return;
  }

  rl.question('Enter the start date/time in ISO format (e.g., 2024-01-01T00:00:00Z):', (startInput) => {
    const timeMin = parseDate(startInput);
    if (!timeMin) {
      rl.close();

      return;
    }

    rl.question('Enter the end date/time in ISO format (e.g., 2024-01-31T23:59:59Z):', (endInput) => {
      const timeMax = parseDate(endInput);
      if (!timeMax) {
        rl.close();

        return;
      }

      getPublicCalendarEvents(calendarId, timeMin, timeMax)
        .then(busyIntervals => {
          console.log('Busy intervals!!:', busyIntervals);
          rl.close();
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          rl.close();
        });
    });
  });
});
