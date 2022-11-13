import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Courses = [
  {
    name: 'ICS 111',
  },
  {
    name: 'ICS 211',
  },
  {
    name: 'ICS 241',
  },
  {
    name: 'ICS 314',
  },
  {
    name: 'EE 160',
  },
  {
    name: 'EE 205',
  },
  {
    name: 'EE 211',
  },
];

const ListCourses = () => (
  <Container className="py-3">
    <h1>Courses</h1>
    <Row>
      {Courses.map(course => (
        <Col md={3} className="d-grid py-2">
          <Button variant="success" size="lg" as={Link} to={`/courses/${course.name.replace(/\s+/g, '')}`}>{course.name}</Button>
        </Col>
      ))}
    </Row>
    <Row className="justify-content-center py-2">
      <Col md={4} className="d-grid">
        <Button variant="success" size="lg" as={Link} to="/addCourse">Add Course</Button>
      </Col>
    </Row>
  </Container>
);

export default ListCourses;
