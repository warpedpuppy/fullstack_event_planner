import TokenService from './token-service';
import config from '../config';

const EventsServices = {
  postNewEvent(obj) {
    return fetch(`${config.API_ENDPOINT}/events/new-event`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(obj),
    })
    .then(response => response.json())
  },
  deletePhoto(id, url) {
    const obj = {
      id, url,
    };
    return fetch(`${config.API_ENDPOINT}/events/delete-photo`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(obj),
    });
  },
  deleteEvent(id) {
    return fetch(`${config.API_ENDPOINT}/events/delete-event`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ id }),
    })
    .then(response => response.json())
  },
  updateEvent(id, obj) {
    const body = {
      id, obj, 
    };
    return fetch(`${config.API_ENDPOINT}/events/edit-event`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(body),
    });
  },
  createFileNames(obj, string) {
    const titleWithoutSpaces = obj.title.replace(/ /g, '');
    const { files } = document.getElementById(string);
    const imageName = `${titleWithoutSpaces}${files[0].name}`;
  
    const img_url = config.IMAGE_ROOT + imageName;
    return { img_url, imageName };
  },
  getAllEvents() {
    return fetch(`${config.API_ENDPOINT}/events/events`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((resultJson) => resultJson);
  },
  getAllPhotos() {
    return fetch(`${config.API_ENDPOINT}/events/photos`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((result) => result.json())
      .then((resultJson) => resultJson);
  },


};
export default EventsServices;
