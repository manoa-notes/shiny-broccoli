import React from 'react';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, SelectField } from 'uniforms-bootstrap5';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { pageStyle } from './pageStyles';
import { Courses } from './ListCourses';
import { ComponentIDs, PageIDs } from '../utilities/ids';

const makeSchema = (allInterests, allParticipants) => new SimpleSchema({
  title: String,
  description: String,
  course: String,
  pictures:  String,
  interests: { type: Array, label: 'Interests', optional: false },
  'interests.$': { type: String, allowedValues: allInterests },
  participants: { type: Array, label: 'Participants', optional: true },
  'participants.$': { type: String, allowedValues: allParticipants },
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
                  <Col xs={4}><TextField id={ComponentIDs.addProjectFormPicture} name="picture" showInlineError placeholder="Notes" /></Col>
                  <Col xs={4}><TextField id={ComponentIDs.addProjectFormHomePage} name="homepage" showInlineError placeholder="Homepage URL" /></Col>
                </Row>
                <LongTextField id={ComponentIDs.addProjectFormDescription} name="description" placeholder="Describe the notes here" />
                <Row>
                  <Col xs={6} id={ComponentIDs.addProjectFormInterests}>
                    <SelectField name="interests" showInlineError placeholder="Interests" multiple checkboxes />
                  </Col>
                  <Col xs={6} id={ComponentIDs.addProjectFormParticipants}>
                    <SelectField name="participants" showInlineError placeholder="Participants" multiple checkboxes />
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
