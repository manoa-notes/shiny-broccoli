import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Image } from 'react-bootstrap';
import Rating from 'react-rating';
import { StarFill } from 'react-bootstrap-icons';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Ratings } from '../../api/rating/Rating';
import LoadingSpinner from './LoadingSpinner';

/** Renders a single note card. */
const NoteCard = ({ note }) => {
  const { ready, ratings } = useTracker(() => {
    const sub = Meteor.subscribe(Ratings.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub.ready();
    // Get the Stuff documents
    const ratingItems = Ratings.collection.find({ noteID: note._id }).fetch();
    return {
      ratings: ratingItems,
      ready: rdy,
    };
  }, []);
  const numRatings = ratings.length;
  const avgRating = _.reduce(ratings, (memo, rating) => memo + rating.rating, 0) / numRatings;

  return ready ? (
    <Col md={3}>
      <Card className="h-100">
        <Card.Header>
          <Image src={note.image} style={{ maxHeight: '200px' }} />
          <Card.Title>{note.title}</Card.Title>
          <Card.Subtitle>{note.owner}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <p>{note.description}</p>
            <Rating
              initialRating={avgRating}
              emptySymbol={<StarFill color="gainsboro" />}
              fullSymbol={<StarFill color="gold" />}
              readonly
              style={{ fontSize: '25px' }}
              className="pe-2"
            />
            {numRatings} ratings
          </Card.Text>
          <Button variant="success" as={Link} to={`/notes/${note._id}`}>See more</Button>
        </Card.Body>
      </Card>
    </Col>
  ) : <LoadingSpinner />;
};

// Require a document to be passed to this component.
NoteCard.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    course: PropTypes.string,
    owner: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default NoteCard;
