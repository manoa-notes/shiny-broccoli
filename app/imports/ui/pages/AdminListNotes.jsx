import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../api/note/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AdminListNotes = () => {
  const [showItems, setShowItems] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (input) => { setSearch(`${input}`); };

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

  useEffect(() => {
    if (search === '') {
      setShowItems(notes);
    } else {
      setShowItems(notes.filter(note => note.title.toLowerCase().includes(search)));
    }
  }, [notes, search]);

  return (ready ? (
    <Container className="py-3" id={PageIDs.listNotesPage}>
      <Row className="align-items-center">
        <Col md={2}>
          <h1>Notes</h1>
        </Col>
        <Col className="text-end">
          <Button id={ComponentIDs.addNoteLink} variant="success" as={Link} to="/addNote">Add notes</Button>
        </Col>
      </Row>
      <SearchBar handleSearch={handleSearch} />
      <Row>
        {showItems.length > 0 ? (
          showItems.map(note => <NoteCard key={note._id} note={note} removable />)
        ) : (
          <p style={{ fontSize: '18px' }}>
            No notes found with &apos;{search}&apos; in the title.
            Please try again.
          </p>
        )}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminListNotes;
