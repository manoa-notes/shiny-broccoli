import React from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Courses } from '../../api/course/Courses';
import { Notes } from '../../api/note/Note';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { removeCourseMethod } from '../../startup/both/Methods';

const AdminListCourses = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
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
    const courseItems = Courses.collection.find({}, { sort: { name: 1 } }).fetch();
    return {
      courses: courseItems,
      ready: rdy,
    };
  }, []);

  const handleRemove = (_id) => {
    Meteor.call(removeCourseMethod, { _id }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      }
    });
  };

  return (ready ? (
    <Container className="py-3" id={PageIDs.adminListCoursesPage}>
      <h1>Courses</h1>
      <Row>
        {courses.map(course => (
          <Col md={3} className="d-grid py-2" key={course._id}>
            <ButtonGroup>
              <Button variant="success" size="lg" as={Link} to={`/courses/${course.path}`}>
                {course.name} ({Notes.collection.find({ course: course.name }).fetch().length} notes)
              </Button>
              <Button
                className="flex-grow-0"
                variant="danger"
                onClick={() => handleRemove(course._id)}
                id={ComponentIDs.removeCourse}
              >
                <Trash />
              </Button>
            </ButtonGroup>
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

export default AdminListCourses;
