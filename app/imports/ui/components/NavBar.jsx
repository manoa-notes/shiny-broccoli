import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <Image src="/images/rainbow-notes-logo.png" height={50} style={{ marginBottom: 3 }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              <Nav.Link id={ComponentIDs.coursesLink} as={NavLink} to="/home" key="home">Home</Nav.Link>
            ) : ''}
            {!(Roles.userIsInRole(Meteor.userId(), 'admin')) ? ([
              <Nav.Link id={ComponentIDs.coursesLink} as={NavLink} to="/courses" key="courses">Courses</Nav.Link>,
              <Nav.Link id={ComponentIDs.notesLink} as={NavLink} to="/notes" key="notes">Notes</Nav.Link>,
            ]) : ''}
            {currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id={ComponentIDs.adminCoursesLink} as={NavLink} to="/admincourses" key="admincourses">Courses</Nav.Link>,
              <Nav.Link id={ComponentIDs.adminNotesLink} as={NavLink} to="/adminnotes" key="adminnotes">Notes</Nav.Link>,
              <Nav.Link id={ComponentIDs.adminProfilesLink} as={NavLink} to="/adminprofiles" key="adminprofiles">Profiles</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="loginDropdown" title="Login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin">
                  <PersonFill />
                  {' '}
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup">
                  <PersonPlusFill />
                  {' '}
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.homeFormBio} as={NavLink} to="/profile">
                  <PersonFill />
                  {' '}
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
