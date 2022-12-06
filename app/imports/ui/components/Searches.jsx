import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const Searches = ({ handleSearch }) => {
  const [filter, setFilter] = useState('');
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      return handleSearch(filter.trim());
    }}
    >
      <InputGroup className="mb-3" onSubmit={() => handleSearch(filter.trim())}>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={(event) => setFilter(event.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" type="submit">
          <Search />
        </Button>
      </InputGroup>
    </form>
  );
};

Searches.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Searches;
