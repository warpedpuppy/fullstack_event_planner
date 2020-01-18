import React from 'react';
import './AllPhotos.css';
import EventServices from '../../services/events-services';
import AllPhotosTableRow from './AllPhotosTableRow';
import SiteContext from '../../SiteContext';
import Table from 'react-bootstrap/Table'

export default class AllPhotos extends React.Component {
  componentDidMount() {
    EventServices.getAllPhotos()
      .then((photos) => {
        this.context.setPhotos(photos.photos);
      });
  }

    deletePhoto = (e, id, img_url) => {
      e.preventDefault();
      EventServices.deletePhoto(id, img_url)
        .then((result) => {
          const photos = this.context.photos.filter((photo) => photo.id !== id);
          this.context.setPhotos(photos);
        });
    }

    render() {
      console.log(this.context)
      const photos = this.context.photos.map((photo, i) => <AllPhotosTableRow key={i} {...photo} deletePhoto={this.deletePhoto} />);
      return (
        <div className="all-photos-table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>imge</th>
              <th>currently being used with</th>
            </tr>
          </thead>
          <tbody>
            {photos}
          </tbody>
        </Table>
        </div>
      );
    }
}
AllPhotos.contextType = SiteContext;
