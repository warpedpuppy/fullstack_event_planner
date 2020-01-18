import React from 'react';
import './Event.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Utils from '../../services/utils';
export default function Event(props) {

  return (
    <Card style={{ width: '200px' }}>
      <Card.Img variant="top" src={props.img_url} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
        { Utils.formatDate(props.event_date) }
        </Card.Text>
        <Card.Text>
        {props.event_description}
        </Card.Text>
        <Button onClick={(e) => props.onButtonClick(e, props.id)} variant="primary">see details</Button>
      </Card.Body>
    </Card>
  );
}
