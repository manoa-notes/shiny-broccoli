import React from 'react';
import { Container, Form, Image, InputGroup, Row, Button } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container className="text-lg-start">
        <h1 className="ekomomai" style={{ fontSize: '50pt' }}>
          Rainbow Notes
        </h1>
        <h3 style={{ paddingBottom: '20px', color: '#DADED4', marginBottom: 0, textAlign: 'center' }}>
          <strong>Kōkua your fellow students</strong>
        </h3>
      </Container>
    </div>
    <Container fluid className="container-xxl landing-photo-background">
      <div className="landing-photo-bg">
        <Container className="landing-message">
          <h1 style={{ fontSize: '50pt' }}>
            University wide note sharing
          </h1>
          <h2>
            at the click of a button.
          </h2>
          <br />
          <br />
        </Container>
        <Container className="justify-content-center text-center">
          <Row>
            <Form>
              <InputGroup size="lg">
                <Form.Control placeholder="Search for your course code here to get started" />
                <Button
                  variant="success"
                  type="submit"
                >
                  SHOOTS
                </Button>
              </InputGroup>
            </Form>
          </Row>
        </Container>
      </div>
    </Container>
    <div className="landing-green-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: '#DADED4' }}>HOW TO GET STARTED</h2>
        <Row>
          <Row>
            <h3>STEP 1: Searching for your course</h3>
            <Image src="/images/search-course-page.png" width={450} />
          </Row>
          <Row>
            <h3>STEP 2: Share your notes</h3>
            <Image src="/images/add-notes-page.png" width={450} />
          </Row>
          <Row>
            <h3>STEP 3: Review Notes</h3>
            <Image src="/images/sample-note-1.jpg" width={450} />
          </Row>
        </Row>
      </Container>
    </div>

  </div>
);

export default Landing;
