import React from 'react';
import { Col, Container, NavDropdown, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Forum = () => (
  <Container className="py-3">
    <Row>
      <Col className="text-center col-md-auto">
        <h2>SEARCH</h2>
        <h2>SEARCH BY</h2>
        <h3>
          <NavDropdown id="navbar-current-user" title="COURSE">
            <NavDropdown.Item id="navbar-profile" as={NavLink} to="/profile">
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
        <h3>HOT</h3>
      </Col>
      <Col className="text-center">
        <h2>Forums here</h2>
      </Col>
    </Row>
  </Container>
);

export default Forum;