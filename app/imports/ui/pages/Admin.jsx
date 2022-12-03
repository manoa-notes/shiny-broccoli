import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../../api/note/Note';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import NoteCard from '../components/NoteCard';

/* Renders the Home Page: what appears after the user logs in. */
const Admin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = sub1.ready();
    const rdy2 = sub2.ready();
    const rdy = rdy1 && rdy2;
    return {
      ready: rdy,
    };
  }, []);
  let profile;
  let courses;
  if (ready) {
    profile = Profiles.collection.findOne({ email: Meteor.user().username });
    courses = profile.courseInterests;
  }
  const recommendedNotes = (courses !== undefined) ? Notes.collection.find({ course: { $in: courses } }).fetch() : {};
  const allNotes = Notes.collection.find({ }).fetch();

  return ready ? (
    <Container className="py-3">
      <h2 className="py-3">
        Edit ALL NOTES
        <Button className="ms-2" variant="success" as={Link} to="/removeNote">Edit Notes</Button>
      </h2>
      <h2 className="py-3">
        Edit ALL PROFILES
        <Button className="ms-2" variant="success" as={Link} to="/listprofiles">Edit Profile</Button>
      </h2>
      <h2 className="py-3">
        Edit ALL Courses
        <Button className="ms-2" variant="success" as={Link} to="/removeCourse">remove Course</Button>
      </h2>
    </Container>
  ) : <LoadingSpinner />;
};

export default Admin;
