import React from 'react';
import EventServices from '../../services/events-services';
import UploadService from '../../services/uploader-service';
import SiteContext from '../../SiteContext';
import Button from 'react-bootstrap/Button';
export default class EventsTableRow extends React.Component {
    state = {
      editMode: false,
      confirmDelete: false,
      title: this.props.title,
      event_date: this.props.event_date,
      event_description: this.props.event_description,
      img_url: this.props.img_url
    }

    toggleEditMode = (e) => {
      e.preventDefault();
      this.setState({ editMode: !this.state.editMode });
    }

    submitEdits = (e) => {
      e.preventDefault();
      const obj = {
        title: this.state.title,
        event_date: this.state.event_date,
        event_description: this.state.event_description,
      };
      this.tempObj = obj;

      if (document.getElementById('new-image').value) {
        const fileNames = EventServices.createFileNames(obj, 'new-image');
        obj.img_url = fileNames.img_url;
        UploadService.initUpload('new-image', fileNames.imageName, this.stopEditMode)
      } else {
        this.context.editEvents(this.props.id, obj)
      }

      EventServices.updateEvent(this.props.id, obj)
        .then((result) => {console.log(result); this.stopEditMode();})
        .catch((error) => {console.error(error); this.stopEditMode();});
    }
    stopEditMode = () => {
      this.context.editEvents(this.props.id, this.tempObj)
      this.setState({editMode: false})
    }

    onChangeHandler = (e) => {
      const { name } = e.currentTarget;
      let obj = {};
      if (name === 'title') {
        obj = { title: e.currentTarget.value };
      } else if (name === 'event_date') {
        obj = { event_date: e.currentTarget.value };
      } else if (name === 'event_description') {
        obj = { event_description: e.currentTarget.value };
      } else if (name === 'image') {
        obj = { image: e.currentTarget.value };
      }
      this.setState(obj);
    }

    deleteEvent = (e, id) => {
      this.setState({confirmDelete: false})
      this.props.deleteEvent(e, id)
    }

    render() {
      if (!this.state.editMode) {
            return (
              <tr>
                <td>
                  { !this.state.confirmDelete ? 
                    <>
                    <Button variant="outline-success" onClick={this.toggleEditMode}>edit</Button>
                    <Button variant="outline-warning" onClick={(e) => this.setState({confirmDelete: true})}>delete?</Button>
                    </>
                    :
                    <>
                    <Button variant="outline-warning" onClick={(e) => this.setState({confirmDelete: false})}>cancel delete?</Button>
                    <Button variant="outline-danger" onClick={(e) => this.deleteEvent(e, this.props.id)}>confirm delete</Button>
                    </>
                  }
                </td>
                <td><img src={this.props.img_url} alt={this.props.title} /></td>
                <td><h1>id: {this.props.id}</h1>{this.props.title}</td>
                <td>{this.props.event_description}</td>
                <td>{this.props.event_date.toString()}</td>
              </tr>
            );
      }
      let date = new Date(this.props.event_date).toISOString().substr(0,10);
      return (
        
        <tr>
          <td>
            <Button variant="outline-success" onClick={this.toggleEditMode}> stop edit</Button>
            <Button variant="outline-danger" onClick={this.submitEdits}>submit edits</Button>
          </td>
          <td>
            <img src={this.props.img_url} alt={this.props.title} />
            <input name="event_image" type="file" id="new-image" />
          </td>
          <td><input type="text" name="title" defaultValue={this.props.title} onChange={this.onChangeHandler} /></td>
          <td><textarea name="event_description" onChange={this.onChangeHandler} defaultValue={this.props.event_description} /></td>
          <td>
            <span>current date = {date.toString()} </span>
            <input name="event_date" type="date" id="date" defaultValue={date} onChange={this.onChangeHandler} />
            </td>
        </tr>
      );
    }
}
EventsTableRow.contextType = SiteContext;