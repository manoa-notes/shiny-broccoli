import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Forums = ({ forum }) => (
  <tr>
    <td>{forum.summary}</td>
    <td>{forum.description}</td>
    <td>{forum.image}</td>
    <td>
      <Link to={`/courses/${forum._id}`}>Courses</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
Forums.propTypes = {
  forum: PropTypes.shape({
    summary: PropTypes.string,
    description: PropTypes.number,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Forums;
