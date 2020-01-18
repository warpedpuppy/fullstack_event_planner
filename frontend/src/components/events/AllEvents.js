import React from 'react';
import './AllEvents.css';

import Event from './Event';
import SiteContext from '../../SiteContext';
import { withRouter } from "react-router-dom";

class AllEvents extends React.Component {
    state = {
      events: [],
    }

   
    onButtonClick = (e, id) => {
      e.preventDefault();
      this.props.history.push(`/events/${id}`)
    }

    render() {
      const events = Object.keys(this.context.events).map((event, index) => <Event key={index} onButtonClick={this.onButtonClick} {...this.context.events[event]} />);
      return (
        <div className="all-events">{events}</div>
      );
    }
}

AllEvents.contextType = SiteContext;
export default withRouter(AllEvents)