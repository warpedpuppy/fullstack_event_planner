import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { withRouter } from "react-router-dom";
import './main.scss';
import SiteContext from '../SiteContext';

class DemoApp extends React.Component {
  calendarComponentRef = React.createRef()

  state = {
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() },
    ],
  }
  eventClick = (info) => {
    this.props.history.push(`/events/${info.event.id}`)
  }

  componentDidMount() {
    // const arr = this.context.events.map((event) => ({ title: event.title, id: event.id, date: event.event_date }));

    // this.setState({ calendarEvents: arr });
  }

  render() {

    return (
      <div className="demo-app">
        <div className="demo-app-top">
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.context.calendarEvents}
            eventClick={this.eventClick}

          />
        </div>
      </div>
    );
  }

}
DemoApp.contextType = SiteContext;
export default withRouter(DemoApp)