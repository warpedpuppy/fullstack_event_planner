import TokenService from './token-service';
import config from '../config';

const EventsServices = {
  async postNewEvent(obj) {
    const response = await fetch(`${config.API_ENDPOINT}/events/new-event`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(obj),
    });
    return await response.json();
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
  async deleteEvent(id) {
    const response = await fetch(`${config.API_ENDPOINT}/events/delete-event`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ id }),
    });
    return await response.json();
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
  async getAllEvents() {
    const result = await fetch(`${config.API_ENDPOINT}/events/events`, {
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJson = await result.json();
    return resultJson;
  },
  async getAllPhotos() {
    const result = await fetch(`${config.API_ENDPOINT}/events/photos`, {
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
    const resultJson = await result.json();
    return resultJson;
  },


};
export default EventsServices;
