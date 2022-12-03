import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Profiles = ({ prof }) => {
  const remove = (docid) => {
    console.log(`Remove item ${docid}`);
    collection.remove(docid);
  };
  return (
    <tr>
      <td>{prof.email}</td>
      <td><Button variant="danger" onClick={() => remove(prof._id)}><Trash /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
Profiles.propTypes = {
  prof: PropTypes.shape({
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  collection: PropTypes.object.isRequired,
};

export default Profiles;
