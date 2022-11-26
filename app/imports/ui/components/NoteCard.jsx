import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Image } from 'react-bootstrap';

/** Renders a single note card. */
const NoteCard = ({ note }) => (
  <Col md={3}>
    <Card className="h-100">
      <Card.Header>
        <Image src={note.image} style={{ maxHeight: '200px' }} />
        <Card.Title>{note.title}</Card.Title>
        <Card.Subtitle>{note.owner}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {note.description}
          <br />
          Rating: {note.rating}/5
        </Card.Text>
        <Button variant="success" as={Link} to={`/notes/${note._id}`}>See more</Button>
      </Card.Body>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
NoteCard.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    course: PropTypes.string,
    owner: PropTypes.string,
    rating: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default NoteCard;
