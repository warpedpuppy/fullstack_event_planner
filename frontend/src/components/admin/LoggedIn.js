import React from 'react';
import AddEventForm from './AddEventForm';
import DeleteEditEvents from './DeleteEditEvents';
import './LoggedIn.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EventServices from '../../services/events-services';
export default class LoggedIn extends React.Component {


  componentDidMount () {
    // this will clean out unused photos
    EventServices.getAllPhotos()
  }

  render() {
    return (
      <div className="admin-shell">
        <Tabs defaultActiveKey="addEvent" id="uncontrolled-tab-example">
        <Tab eventKey="addEvent" title="add event">
          <AddEventForm />
        </Tab>
        <Tab eventKey="deleteEditEvents" title="delete/edit events">
          <DeleteEditEvents />
        </Tab>
      </Tabs>
      </div>
    );
  }
}
