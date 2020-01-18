import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AllPhotosTableRow(props) {
  return (
    <tr>
      <td>
        <Button variant="outline-danger" onClick={(e) => props.deletePhoto(e, props.id, props.img_url)}>delete</Button>
      </td>
      <td>
        <img src={props.img_url} className="all-photos-image" alt={props.id} />
      </td>
      <td>{props.title}</td>
    </tr>
  );
}
