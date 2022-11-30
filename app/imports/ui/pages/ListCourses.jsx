import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/course/Courses';
import { PageIDs } from '../utilities/ids';

const ListCourses = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Courses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const courseItems = Courses.collection.find({}, { sort: { name: 1 } }).fetch();
    return {
      courses: courseItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id={PageIDs.listCoursesPage}>
      <h1>Courses</h1>
      <Row>
        {courses.map(course => (
          <Col md={3} className="d-grid py-2" key={course._id}>
            <Button variant="success" size="lg" as={Link} to={`/courses/${course.path}`}>{course.name}</Button>
          </Col>
        ))}
      </Row>
      <Row className="text-center py-4">
        <h4>Don&apos;t see a course? Add one here:
          <Button className="ms-2" variant="success" as={Link} to="/addCourse">Add Course</Button>
        </h4>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListCourses;
