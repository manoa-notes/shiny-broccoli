import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col id={PageIDs.signOutPage} className="sign-out-img justify-content-lg-center text-lg-center">
      <h2 className="text-lg-center ekomomai" style={{ fontSize: '50pt' }}>
        ALOHA
      </h2>
    </Col>
  );
};

export default SignOut;
