import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Rating from 'react-rating';
import { Notes } from '../../api/note/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import NoteCard from '../components/NoteCard';

/* Renders Note document. Use <Note> to render. */
const DisplayNotes = () => {
  const { ready, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Notes documents.
    const subscription = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Notes documents
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
          <Rating />
        </Col>
      </Row>
      <Row className="pt-2">
        {notes.map(note => <NoteCard note={note} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default DisplayNotes;
