import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../api/note/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import NoteCard from '../components/NoteCard';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import SearchBar from '../components/SearchBar';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListNotes = () => {
  const [showItems, setShowItems] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (input) => { setSearch(`${input}`); };

  const { ready, notes, currentUser } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub.ready();

    const user = Meteor.user() ? Meteor.user().username : '';
    // Get the Stuff documents
    const notesItems = Notes.collection.find({}).fetch();
    return {
      notes: notesItems,
      currentUser: user,
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
        { currentUser ? (
          <Col className="text-end">
            <Button id={ComponentIDs.addNoteLink} variant="success" as={Link} to="/addNote">Add notes</Button>
          </Col>
        ) : ''}
      </Row>
      <SearchBar handleSearch={handleSearch} />
      <Row>
        {showItems.length > 0 ? (
          showItems.map(note => <NoteCard key={note._id} note={note} removable={false} />)
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

export default ListNotes;
