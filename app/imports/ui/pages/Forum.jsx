import React from 'react';
import { Button, Col, Container, NavDropdown, Row } from 'react-bootstrap';
import { Fire } from 'react-bootstrap-icons';
import { Link, NavLink } from 'react-router-dom';

export const Forums = [
  {
    name: 'How do pointers work',
    author: 'God™',
  },
  {
    name: 'Electromagnetics',
    author: 'Mark Johnson',
  },
  {
    name: 'What is addition?',
    author: 'John Markson',
  },
  {
    name: 'Object oriented programming',
    author: 'John',
  },
  {
    name: 'How to add integers',
    author: 'Mark',
  },
  {
    name: 'What is rainbow notes?',
    author: 'Phillip Johnson',
  },
  {
    name: 'Bruh',
    author: 'Bruh',
  },
];

const Forum = () => (
  <Container className="py-3">
    <Row>
      <Col className="text-center col-md-auto">
        <form>
          <h4><input className="text-center" type="text" placeholder="SEARCH..." /></h4>
        </form>
        <h4>SEARCH BY</h4>
        <h5>
          <NavDropdown id="navbar-current-user" title="COURSE">
            <NavDropdown.Item id="navbar-profile" as={NavLink} to="/">
              COURSES
            </NavDropdown.Item>
          </NavDropdown>
        </h5>
        <h5>
          <NavDropdown id="navbar-current-user" title="TOP">
            <NavDropdown.Item id="navbar-profile" as={NavLink} to="/">
              ALL TIME
            </NavDropdown.Item>
            <NavDropdown.Item id="navbar-profile" as={NavLink} to="/">
              THIS YEAR
            </NavDropdown.Item>
            <NavDropdown.Item id="navbar-profile" as={NavLink} to="/">
              THIS MONTH
            </NavDropdown.Item>
            <NavDropdown.Item id="navbar-profile" as={NavLink} to="/">
              TODAY
            </NavDropdown.Item>
          </NavDropdown>
        </h5>
        <a href="/" style={{ color: 'black', textDecoration: 'none' }}><h5>HOT <Fire /></h5></a>
      </Col>
      <Col className="text-center d-grid">
        <h2>Forums</h2>
        {Forums.map(forum => (
          <Row className="py-1">
            <Button variant="success" size="lg" as={Link} to={`/forum/${forum.name.replace(/\s+/g, '')}`}>
              <Row>
                <Col style={{ textAlign: 'left' }}>{forum.name}</Col>
                <Col style={{ textAlign: 'right' }}>By {forum.author}</Col>
              </Row>
            </Button>
          </Row>
        ))}
      </Col>
    </Row>
  </Container>
);

export default Forum;
