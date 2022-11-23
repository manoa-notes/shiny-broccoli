import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../api/note/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import { PlusLg } from 'react-bootstrap-icons';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListNotes = () => {
  const { ready, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const notesItems = Notes.collection.find({}).fetch();
    return {
      notes: notesItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="align-items-center">
        <Col md={2}>
          <h1>Notes</h1>
        </Col>
        <Col className="text-end">
          <Button variant="success" as={Link} to="/addNote">Add notes</Button>
        </Col>
      </Row>
      <Row className="pt-2">
        {notes.map(note => (
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
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListNotes;
