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
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { Courses } from '../../api/course/Courses';
import LoadingSpinner from '../components/LoadingSpinner';
import { addNoteMethod } from '../../startup/both/Methods';
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
    const sub = Meteor.subscribe(Courses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub.ready();
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
    const owner = Meteor.user().username;
    Meteor.call(addNoteMethod, { title, course, owner, image, description }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Note added successfully', 'success').then(() => formRef.reset());
      }
    });
  };

  return (ready ? (
    <Container style={pageStyle} id={PageIDs.addNotePage}>
      <h2 className="text-center">Add Notes</h2>
      <Row className="justify-content-center">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField id={ComponentIDs.addNoteFormTitle} name="title" showInlineError placeholder="Note Title" /></Col>
                  <Col xs={6}><TextField id={ComponentIDs.addNoteFormPicture} name="image" showInlineError placeholder="Image Link" /></Col>
                </Row>
                <LongTextField id={ComponentIDs.addNoteFormDescription} name="description" placeholder="Describe the notes here" />
                <RadioField id={ComponentIDs.addNoteRadio} name="course" showInlineError />
                <SubmitField id={ComponentIDs.addNoteFormSubmit} value="Submit" />
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
