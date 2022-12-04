import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../api/note/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import NoteCard from '../components/NoteCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AdminListNotes = () => {
  const { ready, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub.ready();
    // Get the Stuff documents
    const notesItems = Notes.collection.find({}).fetch();
    return {
      notes: notesItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3" id={PageIDs.adminListNotesPage}>
      <Row className="align-items-center">
        <Col md={2}>
          <h1>Notes</h1>
        </Col>
        <Col className="text-end">
          <Button id={ComponentIDs.addNoteLink} variant="success" as={Link} to="/addNote">Add notes</Button>
        </Col>
      </Row>
      <Row>
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            removable
          />
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminListNotes;
