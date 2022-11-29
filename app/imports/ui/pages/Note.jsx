import React from 'react';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import { StarFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import { Notes } from '../../api/note/Note';
import { Ratings } from '../../api/rating/Rating';
import { addRatingMethod } from '../../startup/both/Methods';
import { Profiles } from '../../api/profiles/Profiles';

const Note = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, note, ratings, owner } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Notes.userPublicationName);
    const sub2 = Meteor.subscribe(Ratings.userPublicationName);
    const sub3 = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = sub1.ready();
    const rdy2 = sub2.ready();
    const rdy3 = sub3.ready();
    const rdy = rdy1 && rdy2 && rdy3;
    // Get the Stuff documents
    const noteItem = Notes.collection.findOne(_id);
    const ratingItems = Ratings.collection.find({ noteID: _id }).fetch();
    const ownerItem = Meteor.user().username;
    return {
      note: noteItem,
      ratings: ratingItems,
      owner: ownerItem,
      ready: rdy,
    };
  }, []);
  const numRatings = ratings.length;
  const avgRating = _.reduce(ratings, (memo, rating) => memo + rating.rating, 0) / numRatings;

  const addRating = (userRating) => {
    Meteor.call(addRatingMethod, { _id, owner, userRating }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Rating added successfully', 'success');
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
            initialRating={avgRating}
            emptySymbol={<StarFill color="gainsboro" />}
            fullSymbol={<StarFill color="gold" />}
            fractions={2}
            style={{ fontSize: '40px' }}
            onChange={userRating => addRating(userRating)}
          />
          <text style={{ fontSize: '25px', paddingLeft: '15px' }}>{Math.round(avgRating * 10) / 10}</text>
        </Col>
      </Row>
      <Image src={note.image} alt="note" className="py-3 w-100" />
    </Container>
  ) : <LoadingSpinner />;
};

export default Note;
