import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Courses } from '../../api/course/Courses';
import LoadingSpinner from '../components/LoadingSpinner';
import { Notes } from '../../api/note/Note';
import NoteCard from '../components/NoteCard';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const Course = () => {
  const { path } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, course, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Courses.userPublicationName);
    const sub2 = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = sub1.ready();
    const rdy2 = sub2.ready();
    const rdy = rdy1 && rdy2;
    // Get the Stuff documents
    const courseItem = Courses.collection.findOne({ path: path });
    const noteItems = Notes.collection.find({ course: courseItem.name }).fetch();
    return {
      course: courseItem,
      notes: noteItems,
      ready: rdy,
    };
  }, []);

  if (notes.length === 0) {
    return ready ? (
      <Container className="py-3" id={PageIDs.coursePageEmpty}>
        <h1>{course.name}</h1>
        <h2>Notes</h2>
        <Row>
          <p style={{ fontSize: '18px' }}>
            There are currently no notes for this class. Add some here:
            <Button
              id={ComponentIDs.addNoteInCourseButton}
              className="ms-2"
              variant="success"
              as={Link}
              to="/addNote"
            >Add notes
            </Button>
          </p>
        </Row>
      </Container>
    ) : <LoadingSpinner />;
  }
  return ready ? (
    <Container className="py-3" id={PageIDs.coursePage}>
      <h1>{course.name}</h1>
      <h2>Notes</h2>
      <Row>
        {notes.map(note => <NoteCard key={note._id} note={note} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;

};

export default Course;
