import React from 'react';
import { AutoForm, ErrorsField, LongTextField, RadioField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';
import { Courses } from '../../api/course/Courses';
import LoadingSpinner from '../components/LoadingSpinner';
import { addNoteMethod, addRatingMethod } from '../../startup/both/Methods';
import { Profiles } from '../../api/profiles/Profiles';

const makeSchema = (courses) => new SimpleSchema({
  title: String,
  course: { type: String, allowedValues: courses },
  image: String,
  description: String,
});
const AddNote = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
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
    };
  }, []);
  const formSchema = makeSchema(_.pluck(courses, 'name'));
  const bridge = new SimpleSchema2Bridge(formSchema);
  let fRef = null;

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, course, image, description } = data;
    const profile = Profiles.collection.findOne({ email: Meteor.user().username });
    const owner = `${profile.firstName} ${profile.lastName}`;
    Meteor.call(addNoteMethod, { title, course, owner, image, description }, (error, noteID) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Note added successfully', 'success').then(() => formRef.reset());
      }
      Meteor.call(addRatingMethod, { noteID });
    });
  };

  return (ready ? (
    <Container style={pageStyle}>
      <h2 className="text-center">Add Notes</h2>
      <Row id={PageIDs.addProjectPage} className="justify-content-center">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField name="title" showInlineError placeholder="Note Title" /></Col>
                  <Col xs={6}><TextField name="image" showInlineError placeholder="Image Link" /></Col>
                </Row>
                <LongTextField name="description" placeholder="Describe the notes here" />
                <RadioField name="course" showInlineError />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AddNote;
