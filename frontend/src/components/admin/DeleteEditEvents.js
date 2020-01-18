import React from 'react';
import './DeleteEditEvents.css';
import SiteContext from '../../SiteContext';
import EventsTableRow from './EventsTableRow';
import EventServices from '../../services/events-services';
import Table from 'react-bootstrap/Table';
export default class DeleteEditEvents extends React.Component {
  componentDidMount() {
    if (this.context.events.length === 0) {
      EventServices.getAllEvents()
        .then((result) => {
          this.context.setEvents(result.events);
        })
        .catch((error) => console.error(error));
    }
  }

    deleteEvent = (e, id) => {
      e.preventDefault();

     // const events = Object.keys(this.context.events).filter(event => event.id !== id);
      let tempEvents = Object.assign({}, this.context.events);
      delete tempEvents[id]

      this.context.setEvents(tempEvents);
          
      EventServices.deleteEvent(id)
        .then((result) => result)
        .catch((error) => console.error(error));
    }

    render() {
      const events = Object.keys(this.context.events).map((event, i) => <EventsTableRow key={i} {...this.context.events[event]} deleteEvent={this.deleteEvent} />);

      return (
          <Table striped bordered hover id="delete-edit-events-table">
          <thead>
            <tr>
              <th />
              <th>image</th>
              <th>title</th>
              <th>description</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            { events }
          </tbody>
        </Table>
      );
    }
}
DeleteEditEvents.contextType = SiteContext;
