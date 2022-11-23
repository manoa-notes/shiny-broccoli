import React from 'react';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, RadioField } from 'uniforms-bootstrap5';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { pageStyle } from './pageStyles';
import { ComponentIDs, PageIDs } from '../utilities/ids';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Courses } from '../../api/course/Courses';
import LoadingSpinner from '../components/LoadingSpinner';

const makeSchema = (courses) => new SimpleSchema({
  title: String,
  file: String,
  description: String,
  courses: { type: Array, label: 'Course', optional: true },
  'courses.$': { type: String, allowedValues: courses },
});
const AddNote = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, courses } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Courses.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const courseItems = Courses.collection.find({}, { sort: { name: 1 } }).fetch();
    return {
      courses: courseItems,
      ready: rdy,
    };
  }, []);
  const formSchema = makeSchema(_.pluck(courses, 'name'));
  const bridge = new SimpleSchema2Bridge(formSchema);

  return (ready ? (
    <Container style={pageStyle}>
      <h2 className="text-center">Add Notes</h2>
      <Row id={PageIDs.addProjectPage} className="justify-content-center">
        <Col xs={10}>
          <AutoForm schema={bridge}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField name="title" showInlineError placeholder="Note Title" /></Col>
                  <Col xs={6}>
                    Upload File <br />
                    <input className="pt-1" type="file" name="file" />
                  </Col>
                </Row>
                <LongTextField name="description" placeholder="Describe the notes here" />
                <RadioField name="courses" showInlineError />
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
