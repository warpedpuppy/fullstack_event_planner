import React from 'react';
import AddEventForm from './AddEventForm';
import DeleteEditEvents from './DeleteEditEvents';
import './LoggedIn.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default class LoggedIn extends React.Component {

  makeActive = (e) => {
    e.preventDefault();
    document.querySelector('.active').classList.remove('active');
    document.getElementById(e.currentTarget.name).classList.add('active');
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
