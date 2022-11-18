import React from 'react';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, RadioField } from 'uniforms-bootstrap5';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { pageStyle } from './pageStyles';
import { Courses } from './ListCourses';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const makeSchema = (allInterests) => new SimpleSchema({
  title: String,
  description: String,
  course: String,
  image: String,
  interests: { type: Array, label: 'Course', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});
const AddNote = () => {
  const formSchema = makeSchema(_.pluck(Courses, 'name'));
  const bridge = new SimpleSchema2Bridge(formSchema);

  return (
    <Container style={pageStyle}>
      <Row id={PageIDs.addProjectPage} className="justify-content-center">
        <Col xs={10}>
          <AutoForm schema={bridge}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={6}><TextField id={ComponentIDs.addProjectFormName} name="title" showInlineError placeholder="Note Title" /></Col>
                  <Col xs={6}>
                    Upload File <br />
                    <input type="file" name="image" id={ComponentIDs.addProjectFormPicture} />
                  </Col>
                </Row>
                <LongTextField id={ComponentIDs.addProjectFormDescription} name="description" placeholder="Describe the notes here" />
                <RadioField name="interests" showInlineError />
                <SubmitField id={ComponentIDs.addProjectFormSubmit} value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNote;
