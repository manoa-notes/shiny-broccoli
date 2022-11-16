import React from 'react';
import { Button, Col, Container, NavDropdown, Row } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export const Forums = [
  {
    name: 'How do pointers work',
  },
  {
    name: 'Electromagnetics',
  },
  {
    name: 'What is addition?',
  },
  {
    name: 'Object oriented programming',
  },
  {
    name: 'How to add integers',
  },
  {
    name: 'What is rainbow notes?',
  },
  {
    name: 'Bruh',
  },
];

const Forum = () => (
  <Container className="py-3">
    <Row>
      <Col className="text-center col-md-auto">
        <form>
          <h2><input className="text-center" type="text" placeholder="SEARCH..." /></h2>
        </form>
        <h2>SEARCH BY</h2>
        <h3>
          <NavDropdown id="navbar-current-user" title="COURSE">
            <NavDropdown.Item id="navbar-profile" as={NavLink} to="/">
              COURSES
            </NavDropdown.Item>
          </NavDropdown>
        </h3>
        <h3>
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
        </h3>
        <a href="/" style={{ color: 'black', textDecoration: 'none' }}><h3>HOT</h3></a>
      </Col>
      <Col className="text-center d-grid">
        <h2>Forums</h2>
        {Forums.map(forum => (
          <Row className="py-1">
            <Button variant="success" size="lg" as={Link} to={`/forum/${forum.name.replace(/\s+/g, '')}`}>{forum.name}</Button>
          </Row>
        ))}
      </Col>
    </Row>
  </Container>
);

export default Forum;
