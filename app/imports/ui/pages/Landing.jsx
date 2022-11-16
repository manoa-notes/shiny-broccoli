import React from 'react';
import { Col, Container, Form, Image, InputGroup, Row, Button } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: '#DADED4', fontSize: '36pt' }}>
          E komo mai Rainbow Notes!
        </h1>
        <h3 style={{ paddingBottom: '20px', color: '#DADED4', marginBottom: 0 }}>
          Kokua your fellow students
        </h3>
      </Container>
    </div>
    <div className="landing-grey-background">
      <Container>
        <div className="landing-photo-background">
          <Container>
            <h1 style={{color:'#3C403D'}}>
              University wide note sharing
            </h1>
            <h3 style={{color:'#3C403D'}}>
              at the click of a button.
            </h3>
          </Container>
          <Container className="justify-content-center text-center">
            <Row>
              <Form>
                <InputGroup size="lg">
                  <Form.Control placeholder="Search for your course code here to get started" />
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
        <h2 style={{ color: '#DADED4' }}>How to get started!</h2>
        <Row>
          <Col>
            <h3>Searching for your course</h3>
            <Image src="/images/search-course-page.png" width={450} />
          </Col>
          <Col>
            <h3>Share your notes</h3>
            <Image src="/images/add-notes-page.png" width={450} />
          </Col>
          <Col>
            <h3>Review Notes</h3>
            <Image src="/images/sample-note-1.jpg" width={450} />
          </Col>
        </Row>
      </Container>
    </div>

  </div>
);

export default Landing;
