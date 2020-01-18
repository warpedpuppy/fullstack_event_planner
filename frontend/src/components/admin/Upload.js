import React from 'react';
import UploaderService from '../../services/uploader-service';
import './Upload.css';

export default function UploadForm() {
  return (
    <form id="image-upload" onSubmit={UploaderService.initUpload.bind(UploaderService, 'file-input')}>
      <p id="status">Please select a file</p>
      <input type="file" id="file-input" />
      <img id="preview" alt="img" src="/images/default.png" />
      <input type="hidden" id="avatar-url" name="avatar-url" value="/images/default.png" />
      <input type="submit" value="Update profile" />
    </form>
  );
}
