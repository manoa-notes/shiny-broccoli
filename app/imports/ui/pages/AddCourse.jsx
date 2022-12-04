import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { addCourseMethod } from '../../startup/both/Methods';
import { ComponentIDs, PageIDs } from '../utilities/ids';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddCourse = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    Meteor.call(addCourseMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Course added successfully', 'success').then(() => formRef.reset());
      }
    });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id={PageIDs.addCoursePage}>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Course</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" id={ComponentIDs.addCourseName} />
                <SubmitField value="Submit" id={ComponentIDs.addCourseSubmit} />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCourse;
