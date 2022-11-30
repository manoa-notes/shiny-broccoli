import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { Courses } from '../../api/course/Courses';
import LoadingSpinner from '../components/LoadingSpinner';
import { Notes } from '../../api/note/Note';
import NoteCard from '../components/NoteCard';
import { PageIDs } from '../utilities/ids';

const Course = () => {
  const { path } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, course } = useTracker(() => {
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
    return {
      course: courseItem,
      ready: rdy,
    };
  }, []);
  return ready ? (
    <Container className="py-3" id={PageIDs.listCoursesPage}>
      <h1>{course.name}</h1>
      <h2>Notes</h2>
      <Row className="py-2">
        {Notes.collection.find({ course: course.name }).fetch().map(note => <NoteCard note={note} />)}
      </Row>
      <h2>Forum Posts</h2>
    </Container>
  ) : <LoadingSpinner />;
};

export default Course;
