import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Courses = ({ course }) => (
  <tr>
    <td>{course.name}</td>
    <td>{course.notes}</td>
    <td>
      <Link to={`/courses/${course._id}`}>Courses</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
Courses.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    notes: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default Courses;
