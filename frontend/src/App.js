import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import EventPage from './components/events/EventPage';
import Admin from './pages/Admin';
import SiteContext from './SiteContext';
import TokenService from './services/token-service';
import EventServices from './services/events-services';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: TokenService.hasAuthToken(),
      events: {},
      photos: [],
      calendarEvents: []
    };
  }
  componentDidMount() {
    EventServices.getAllEvents()
      .then((result) => {
        try {
          this.setEvents(result.events);
        } catch (e) {
          console.error(e);
        }
      })
      .catch((error) => console.error(error));

      
  }
  loginHandler = (loggedIn) => {
    this.setState({ loggedIn });

    if (!loggedIn) {
      TokenService.clearAuthToken();
    }
  }

  setEvents = (events) => {
    this.setState({ events });
    const arr = Object.keys(events).map(event => {
        return {
          date: events[event].event_date,
          title: events[event].title,
          id: events[event].id
        }
      });
    this.setState({ calendarEvents: arr });
  }

  editEvents = (id, edited_event) => {
    let events = Object.assign({}, this.state.events)
    events[id] = Object.assign({}, this.state.events[id], edited_event);
    this.setState({ events });
  }

  setPhotos = (photos) => {
    this.setState({ photos });
  }

  render() {
    const { loggedIn } = this.state;
    const contextValue = {
      loggedIn,
      loginHandler: this.loginHandler,
      events: this.state.events,
      setEvents: this.setEvents,
      photos: this.state.photos,
      setPhotos: this.setPhotos,
      editEvents: this.editEvents,
      calendarEvents: this.state.calendarEvents
    };

    return (
      <SiteContext.Provider value={contextValue}>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/events/:id" component={EventPage} />
          </Switch>
        </main>
      </SiteContext.Provider>
    );
  }
}

export default App;
