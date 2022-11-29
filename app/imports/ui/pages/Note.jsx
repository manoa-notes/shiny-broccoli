import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import { StarFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Notes } from '../../api/note/Note';
import { Ratings } from '../../api/rating/Rating';
import { updateRatingMethod } from '../../startup/both/Methods';

const Note = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, note, rating } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Notes.userPublicationName);
    const sub2 = Meteor.subscribe(Ratings.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = sub1.ready();
    const rdy2 = sub2.ready();
    const rdy = rdy1 && rdy2;
    // Get the Stuff documents
    const noteItem = Notes.collection.findOne(_id);
    const ratingItem = Ratings.collection.findOne({ noteID: _id });
    return {
      note: noteItem,
      rating: ratingItem,
      ready: rdy,
    };
  }, []);

  const updateRating = (userRating) => {
    Meteor.call(updateRatingMethod, { _id, userRating }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Rating updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container className="py-3">
      <Row>
        <Col>
          <h2>{note.title}</h2>
          <h4>By: {note.owner}</h4>
        </Col>
        <Col className="text-end">
          <Rating
            initialRating={rating.stars}
            emptySymbol={<StarFill color="gainsboro" />}
            fullSymbol={<StarFill color="gold" />}
            fractions={2}
            style={{ fontSize: '40px' }}
            onChange={rate => updateRating(rate)}
          />
          <text style={{ fontSize: '25px', paddingLeft: '15px' }}>{Math.round(rating.stars * 10) / 10}</text>
        </Col>
      </Row>
      <Image src={note.image} alt="note" className="py-3 w-100" />
    </Container>
  ) : <LoadingSpinner />;
};

export default Note;
