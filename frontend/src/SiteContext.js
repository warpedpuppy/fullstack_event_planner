import React from 'react';

const SiteContext = React.createContext({
  loggedIn: false,
  events: {},
  photos: [],
  calendarEvents: []
});

export default SiteContext;
