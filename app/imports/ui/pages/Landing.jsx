import React from 'react';
import { Col, Container, Form, Image, InputGroup, Row, Button } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}>
          Welcome to Rainbow Notes
        </h1>
        <h3 style={{ paddingBottom: '20px', color: 'white', marginBottom: 0 }}>
          Kokua your fellow students
        </h3>
      </Container>
    </div>
    <div className="landing-grey-background">
      <Container>
        <div className="landing-photo-background">
          <Container className="justify-content-center text-center">
            <Row>
              <Form>
                <InputGroup size="lg">
                  <Form.Control placeholder="Search for your course here to get started"/>
                  <Button variant="primary" type="submit">
                    Shoots!
                  </Button>
                </InputGroup>
              </Form>
            </Row>
          </Container>
        </div>
      </Container>
    </div>
    <div className="landing-green-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>Short how to use the site guide?</h2>
        <Row>
          <Col>
            <h3>Searching for Notes</h3>
            <Image src="/images/add-project-page.png" width={450} />
          </Col>
          <Col>
            <h3>Add to your Binder</h3>
            <Image src="/images/projects-page.png" width={450} />
          </Col>
          <Col>
            <h3>Review Notes</h3>
            <Image src="/images/projects-page.png" width={450} />
          </Col>
        </Row>
      </Container>
    </div>

  </div>
);

export default Landing;
