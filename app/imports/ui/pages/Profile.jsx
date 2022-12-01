import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { pageStyle } from './pageStyles';
import { Courses } from '../../api/course/Courses';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { updateProfileMethod } from '../../startup/both/Methods';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (courses) => new SimpleSchema({
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  email: { type: String, label: 'Email', optional: true },
  bio: { type: String, label: 'Biography', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  courseInterests: { type: Array, label: 'Courses Interested In', optional: true },
  'courseInterests.$': { type: String, allowedValues: courses },
});

const Profile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses, email } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Courses.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = sub1.ready();
    const rdy2 = sub2.ready();
    const rdy = rdy1 && rdy2;
    // Get the Stuff documents
    const courseItems = Courses.collection.find({}, { sort: { name: 1 } }).fetch();
    return {
      courses: courseItems,
      ready: rdy,
      email: Meteor.user()?.username,
    };
  }, []);
  const formSchema = makeSchema(_.pluck(courses, 'name'));
  const model = Profiles.collection.findOne({ email });
  const bridge = new SimpleSchema2Bridge(formSchema);

  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  };

  return (ready ? (
    <Container className="justify-content-center" style={pageStyle}>
      <Col>
        <Col className="justify-content-center text-center"><h2>Your Profile</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row>
                <Col xs={4}><TextField name="firstName" showInlineError placeholder="First Name" /></Col>
                <Col xs={4}><TextField name="lastName" showInlineError placeholder="Last Name" /></Col>
                <Col xs={4}><TextField name="email" showInlineError placeholder="email" disabled /></Col>
              </Row>
              <LongTextField name="bio" placeholder="Write a little bit about yourself." />
              <Row>
                <Col xs={6}><TextField name="picture" showInlineError placeholder="URL to picture" /></Col>
                <Col xs={6}><SelectField name="courseInterests" showInlineError multiple /></Col>
              </Row>
              <SubmitField value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />);
};

export default Profile;
