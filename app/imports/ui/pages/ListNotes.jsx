import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Notes } from '../../api/note/Note';
import NoteCard from '../components/NoteCard';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import Searches from '../components/Searches';

const ALL = 'All';
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListNotes = () => {
  // eslint-disable-next-line no-unused-vars
  const [showItems, setShowItems] = useState([]);
  const [title, setTitle] = useState(ALL);
  const [search, setSearch] = useState('');

  const handleSearch = (input) => { setSearch(`${input}`); };
  const handleCategoryType = (category) => {
    handleSearch('');
    setTitle(`${category}`);
  };

  const { notes } = useTracker(() => {
    const notesItems = Notes.collection.find({}).fetch();
    return {
      notes: notesItems,
    };
  }, []);
  useEffect(() => {
    console.log('rendered');
    document.title = 'ManoaXchange - Shop';
    if (search.length > 0) {
      setShowItems(notes.filter(note => note.title.toLowerCase().includes(search)));
      setTitle(ALL);
    } else if (title === ALL) {
      setShowItems(notes);
    } else {
      setShowItems(notes.filter(note => note.course === title));
    }
  }, [notes.length, title, search]);

  console.log('title:', title);
  console.log('search:', search);
  return (
    <Container className="py-3" id={PageIDs.listNotesPage}>
      <Row className="align-items-center">
        <Col md={2}>
          <h1>Notes</h1>
        </Col>
        <Col className="text-end">
          <Button id={ComponentIDs.addNoteLink} variant="success" as={Link} to="/addNote">Add notes</Button>
        </Col>
      </Row>
      <Row>
        <Nav className="d-flex flex-column">
          <Nav.Item key="searchbox">
            <Searches handleSearch={handleSearch} />
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => handleCategoryType('All')}
              className="text-light d-flex gap-2 align-items-center"
              style={{ paddingLeft: 0 }}
            />
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        {showItems.length > 0
            ? showItems.map(note => <NoteCard key={note._id} note={note} removable={false} />)
            : <div> No items found </div>}
      </Row>
      <Row>
        {notes.map(note => <NoteCard key={note._id} note={note} removable={false} />)}
      </Row>
    </Container>
  );
};

export default ListNotes;
