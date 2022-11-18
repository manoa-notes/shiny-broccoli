import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Ratings = ({ rating }) => (
  <tr>
    <td>{rating.rating}</td>
    <td>
      <Link to={`/courses/${rating._id}`}>Courses</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
Ratings.propTypes = {
  rating: PropTypes.shape({
    rating: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default Ratings;
