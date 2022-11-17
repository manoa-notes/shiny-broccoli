import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Notes = ({ note }) => (
  <tr>
    <td>{note.owner}</td>
    <td>{note.rating}</td>
    <td>
      <Link to={`/courses/${note._id}`}>Course</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
Notes.propTypes = {
  note: PropTypes.shape({
    note: PropTypes.number,
    owner: PropTypes.string,
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default Notes;
