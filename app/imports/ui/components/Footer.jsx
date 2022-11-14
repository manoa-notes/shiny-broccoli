import React from 'react';
import { Col, Container } from 'react-bootstrap';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center" style={{ color: 'white' }}>
        Rainbow Notes
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        Created by:Alex Bozyck, Marc Ivan Manalac, Linda Nguyen, AJ Patalinghog, and Joshua Aaron Subia
        {' '}
        <br />
        <a style={{ color: 'white' }} href="https://rainbow-notes.github.io">https://rainbow-notes.github.io</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
