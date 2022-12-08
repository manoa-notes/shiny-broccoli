import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import { StarFill, Trash } from 'react-bootstrap-icons';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Ratings } from '../../api/rating/Rating';
import { removeNoteMethod } from '../../startup/both/Methods';
import { ComponentIDs } from '../utilities/ids';

/** Renders a single note card. */
const NoteCard = ({ note, removable }) => {
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

  const handleRemove = (_id) => {
    Meteor.call(removeNoteMethod, { _id }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      }
    });
  };

  return ready ? (
    <Col md={3} className="py-2">
      <Card className="h-100">
        <Image height={200} src={note.image} />
        <Card.Header>
          <Card.Title className="overflow-wrap">{note.title}</Card.Title>
          <Card.Subtitle>{note.owner}</Card.Subtitle>
        </Card.Header>
        <Card.Body className="pb-0">
          <Card.Text>
            {note.description}
          </Card.Text>
        </Card.Body>
        <Row className="px-3 pb-2">
          <Col>
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
          <Row>
            <Col>
              <Button
                id={ComponentIDs.seeNoteLink}
                variant="success"
                as={Link}
                to={`/notes/${note._id}`}
              >
                See more
              </Button>
            </Col>
            {removable ? (
              <Col className="text-end">
                <Button
                  variant="danger"
                  id={ComponentIDs.removeNote}
                  onClick={() => handleRemove(note._id)}
                >
                  <Trash />
                </Button>
              </Col>
            ) : ''}
          </Row>
        </Card.Body>
          </Col>
        </Row>
        <Row className="px-3 pb-3">
          <Col>
            <Button variant="success" as={Link} to={`/notes/${note._id}`}>See more</Button>
          </Col>
          {removable ? (
            <Col className="text-end">
              <Button variant="danger" onClick={() => handleRemove(note._id)}><Trash /></Button>
            </Col>
          ) : ''}
        </Row>
      </Card>
    </Col>
  ) : '';
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
  removable: PropTypes.bool.isRequired,
};

export default NoteCard;
