import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../api/note/Note';
import { Ratings } from '../../api/rating/Rating';
import LoadingSpinner from '../components/LoadingSpinner';
import NoteCard from '../components/NoteCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListNotes = () => {
  const { ready, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Notes.userPublicationName);
    const sub2 = Meteor.subscribe(Ratings.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = sub1.ready();
    const rdy2 = sub2.ready();
    const rdy = rdy1 && rdy2;
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
        {notes.map(note => <NoteCard note={note} rating={Ratings.collection.findOne({ noteID: note._id })} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListNotes;
