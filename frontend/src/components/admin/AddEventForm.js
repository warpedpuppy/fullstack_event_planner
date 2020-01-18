import React from 'react';
import './AddEventForm.css';
import EventServices from '../../services/events-services';
import UploadService from '../../services/uploader-service';
import SiteContext from '../../SiteContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinners from '../../components/Spinners';
export default class AddEventForm extends React.Component {

    constructor(props){
        super(props)
        this.img = new Image();
        this.img.onload = this.imgLoadHandler;
        this.imgValue = '';
        this.file = null;
        this.state = {
            title: '',
            date: new Date(),
            description: '',
            image: '',
            counter: 2,
            photoSizeCheck: false,
            photoMessage: "images must be 640x480"
        }
    }
    
    imgLoadHandler = () => {
            URL.revokeObjectURL(this.file)
            if (this.img.width === 640 && this.img.height === 480) {
                this.setState({
                    photoMessage: "correct size",
                    photoSizeCheck: true
                })
                let str = this.imgValue;
                document.getElementById('loader-label').innerHTML = str.substring(str.lastIndexOf(`\\`) + 1);
            } else {
                this.setState({
                    photoMessage: "wrong size -- must be 640x480",
                    photoSizeCheck: false
                })
                document.getElementById('event_image').value = null;
                document.getElementById('loader-label').innerHTML = "upload a new image";
            }
    }


    onSubmitHandler = (e) => {

        e.preventDefault();

        if (!this.state.photoSizeCheck) return;

        e.target.title.value = '';
        e.target.event_description.value = '';
        e.target.event_date.value = '';
        this.setState({counter: 0})
        const obj = {
            title: this.state.title,
            event_date: this.state.date,
            event_description: this.state.description
        };

        const fileNames = EventServices.createFileNames(obj, 'event_image');
        obj.img_url = fileNames.img_url;

        EventServices.postNewEvent(obj)
        .then((result) => {
            this.setState({
                counter: this.state.counter + 1
            })
            //get the id from the backend
            obj.id = result.event;
            UploadService.initUpload('event_image', fileNames.imageName, this.addNewEventToContext.bind(this, obj))

        }).catch((error) => {
            this.setState({
                counter: this.state.counter + 1
            })
            console.error(error)
        });

        
    }


    addNewEventToContext = (obj) => {
        this.setState({
            counter: this.state.counter + 1
        })
        let events = Object.assign({}, this.context.events)
        events[obj.id] = obj;
        this.context.setEvents(events);

        const photos = [
            ...this.context.photos, {
                img_url: obj.img_url
            }
        ];
        this.context.setPhotos(photos);

        document.getElementById('event_image').value = null;
        document.getElementById('loader-label').innerHTML = "upload a new image";

        this.setState({
            photoMessage: "images must be 640x480",
            photoSizeCheck: false
        })
    }
    

    onChangeHandler = (e) => {
        const {name} = e.currentTarget;
        let obj = {};
        if (name === 'title') {
            obj = {
                title: e.currentTarget.value
            };
        } else if (name === 'event_date') {
            obj = {
                date: e.currentTarget.value
            };
        } else if (name === 'event_description') {
            obj = {
                description: e.currentTarget.value
            };
        } else if (name === 'event_image') {

            //move test for size here
            const { files } = document.getElementById('event_image');
            this.file = files[0];
            var url = URL.createObjectURL(this.file);
            this.img.src = url;
            this.imgValue = e.currentTarget.value;
            
            obj = {
                image: e.currentTarget.value
            };
            // let str = e.currentTarget.value;
            // document.getElementById('loader-label').innerHTML = str.substring(str.lastIndexOf(`\\`) + 1);
        }
        this.setState(obj);
    }

    render() {
        let spinnerClass = (this.state.counter === 2) ? 'hide' : 'show';
        let photoMessageClass = (this.state.photoSizeCheck)? 'photo-message-success' : 'photo-message-error';
        return (
            <div>

                <div className="enter-event">
                    <h4>
                        New Event</h4>
                    <div className={
                        `spinner-parent ${spinnerClass}`
                    }>
                        <Spinners/>
                    </div>
                    <div className="module-body">
                        <Form onSubmit={this.onSubmitHandler}>

                            <Form.Group>
                                <Form.Label>event title:
                                </Form.Label>
                                <Form.Control placeholder="test title" type="text" name="title"
                                    onChange={
                                        this.onChangeHandler
                                    }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>date:
                                </Form.Label>
                                <Form.Control type="date"
                                    defaultValue={
                                        this.state.date
                                    }
                                    name="event_date"
                                    onChange={
                                        this.onChangeHandler
                                    }/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>event description:
                                </Form.Label>
                                <Form.Control placeholder="test desc" as="textarea" name="event_description" rows="3"
                                    onChange={
                                        this.onChangeHandler
                                    }/>
                            </Form.Group>
                            <Form.Group className="custom-file">
                                <Form.Control type="file" className="custom-file-input" name="event_image" id="event_image"
                                    onChange={
                                        this.onChangeHandler
                                    }
                                    accept=".jpg, .png, .gif, .jpeg"/>
                                <Form.Label className="custom-file-label" id="loader-label" htmlFor="event_image">upload a new image 640x480
                                </Form.Label>
                                <Form.Text className={photoMessageClass}>{this.state.photoMessage}</Form.Text>
                            </Form.Group>
                            <Form.Group>
                            <Button type="submit">submit</Button>
                            </Form.Group>
                        </Form>

                    </div>
                </div>
            </div>
        );
    }
}
AddEventForm.contextType = SiteContext;
