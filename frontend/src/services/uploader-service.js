import Config from '../config';
import TokenService from './token-service';

const UploaderService = {
  imageName: '',
  onComplete: undefined,
  xhr: new XMLHttpRequest(),
  stage: 1,
  newFile: undefined,
  url: undefined,
  initUpload(id, title, onComplete) {
    this.newFile = undefined;
    this.stage = 1;
    this.onComplete = onComplete;
    this.imageName = title;
    const { files } = document.getElementById(id);
    const file = files[0];
   
    if ( !this.xhr.onreadystatechange) {
      this.xhr.onreadystatechange = this.readyStateChangeHandler.bind(this);
    }

     if (file !== null) {
      this.getSignedRequest(file);
    } 
  },
  readyStateChangeHandler () {
    if (this.xhr.readyState === 4) {
      if (this.xhr.status === 200) {
        if (this.stage === 1) {
          const response = JSON.parse(this.xhr.responseText);
          this.uploadFile(this.newFile, response.signedRequest, response.url);
          this.stage ++;
        } else {
          this.onComplete();
        }
      }
    }
  },
  getSignedRequest(file) {
    this.newFile = file;
    let imageName = this.imageName.replace(/ /g, "%20");
    this.xhr.open('GET', `${Config.API_ENDPOINT}/events/sign-s3?file-name=${imageName}&file-type=${file.type}`);
    this.xhr.setRequestHeader('authorization', `Bearer ${TokenService.getAuthToken()}`);
    this.xhr.send();
  },
  uploadFile(file, signedRequest, url) {
    this.url = url;
    this.xhr.open('PUT', signedRequest);
    this.xhr.send(file);
  }
};

export default UploaderService;
