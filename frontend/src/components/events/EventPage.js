import React from 'react'
import SiteContext from '../../SiteContext'

export default class EventPage extends React.Component {

    render () {
       let id = this.props.match.params.id;

        return (
            <>
                <h1>{this.context.events[id].title}</h1>
                <img src={this.context.events[id].img_url} alt="event"/>
            </>
        )
    }
}
EventPage.contextType = SiteContext;