import React from 'react';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, SelectField } from 'uniforms-bootstrap5';
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
  picture: String,
  interests: { type: Array, label: 'Course', optional: false },
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
                  <Col xs={4}><TextField id={ComponentIDs.addProjectFormName} name="title" showInlineError placeholder="Note Title" /></Col>
                  <Col xs={4}><input type="file" name="picture" id={ComponentIDs.addProjectFormPicture} /> </Col>
                </Row>
                <LongTextField id={ComponentIDs.addProjectFormDescription} name="description" placeholder="Describe the notes here" />
                <Row>
                  <Col xs={6} id={ComponentIDs.addProjectFormInterests}>
                    <SelectField name="interests" showInlineError placeholder="Course" multiple checkboxes />
                  </Col>
                </Row>
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
