import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const SearchBar = ({ handleSearch }) => {
  const [filter, setFilter] = useState('');
  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <form onSubmit={(event) => {
          event.preventDefault();
          return handleSearch(filter.trim().toLowerCase());
        }}
        >
          <InputGroup className="mb-3" onSubmit={() => handleSearch(filter.trim().toLowerCase())}>
            <Form.Control
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(event) => setFilter(event.target.value)}
            />
            <Button variant="success" id="button-addon2" type="submit">
              <Search />
            </Button>
          </InputGroup>
        </form>
      </Col>
    </Row>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
