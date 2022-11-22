import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { Courses } from '../../api/course/Courses';
import LoadingSpinner from '../components/LoadingSpinner';

const Course = () => {
  const { path } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, course } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Courses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const courseItem = Courses.collection.findOne({ path: path });
    return {
      course: courseItem,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container className="py-3">
      <h1>{course.name}</h1>
      <h2>Notes</h2>
      <h2>Forum Posts</h2>
    </Container>
  ) : <LoadingSpinner />;
};

export default Course;
