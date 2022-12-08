import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Trash } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import { removeProfileMethod } from '../../startup/both/Methods';
import { PageIDs } from '../utilities/ids';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const AdminListProfiles = () => {
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find().fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  const handleRemove = (_id, email) => {
    Meteor.call(removeProfileMethod, { _id, email }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      }
    });
  };

  return (ready ? (
    <Container className="py-3" id={PageIDs.adminListProfilesPage}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Col className="text-center"><h2>Profiles</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                !Roles.userIsInRole(Meteor.users.findOne({ username: profile.email }), 'admin') ? (
                  <tr key={profile._id}>
                    <td>{profile.email}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemove(profile._id, profile.email)}><Trash /></Button>
                    </td>
                  </tr>
                ) : ''
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminListProfiles;
