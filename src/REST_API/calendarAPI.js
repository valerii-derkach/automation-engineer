const axios = require('axios');

const { apiKey } = require('../../config');

async function getPublicCalendarEvents(calendarId, timeMin, timeMax) {
  const baseUrl = "https://www.googleapis.com/calendar/v3/calendars/";
  const calendarIdEncoded = encodeURIComponent(calendarId);
  const apiKeyParam = `?key=${apiKey}`;
  const timeParams = `&timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}`;
  const singleEventsParam = "&singleEvents=true";

const URL = baseUrl + calendarIdEncoded + "/events" + apiKeyParam + timeParams + singleEventsParam;

  console.log('Requesting URL:', URL); 

  try {
    const response = await axios.get(URL);
    
    if (response.status !== 200) {
      console.error(`Received a non-success status code: ${response.status}`);

      throw new Error(`Failed to fetch events: Status ${response.status}`);
    }
    
    const data = response.data;

    if (!data.items || data.items.length === 0) {
      console.log('No events found within the specified range.');

      return [];
    }

    const busyIntervals = data.items.map(event => ({
      id: event.id,
      status: event.status,
      organizer: event.organizer.displayName,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date
    }));
  
    return busyIntervals;
  } catch (error) {
    console.error('Error fetching calendar events:', error.message);

    throw new Error('Error fetching calendar events, wrong calendar ID or the API Key');
  }
};

module.exports = getPublicCalendarEvents;

// Uncomment next lines for quick test (node ./src/REST_API/calendarAPI.js):

// const ID = 'a04b6c93c960f3d8c7cab107b0c9fb80b3339cbace7a0df33af75e8ef008970c@group.calendar.google.com';
// // const ID = 'not valid calendar';

// const timeMin = new Date('2024-04-09T00:00:00Z');
// const timeMax = new Date('2024-06-12T23:59:59Z');

// getPublicCalendarEvents(ID, timeMin, timeMax);
