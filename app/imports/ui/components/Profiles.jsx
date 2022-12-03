import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Profiles = ({ prof }) => (
  <Card>
    <Card.Header>
      <Image src={prof.picture} width={75} />
      <Card.Title>{prof.firstName}{prof.lastName}</Card.Title>
      <Card.Subtitle>{prof.email}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{prof.bio}</Card.Text>
      <Card.Text>{prof.courseInterests}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Profiles.propTypes = {
  prof: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    bio: PropTypes.string,
    courseInterests: PropTypes.string,
  }).isRequired,
};

export default Profiles;
