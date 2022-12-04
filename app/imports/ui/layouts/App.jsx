import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import Home from '../pages/Home';
import ListCourses from '../pages/ListCourses';
import Profile from '../pages/Profile';
import AddNote from '../pages/AddNote';
import ListNotes from '../pages/ListNotes';
import Course from '../pages/Course';
import AddCourse from '../pages/AddCourse';
import Note from '../pages/Note';
import AdminListProfiles from '../pages/AdminListProfiles';
import AdminListCourses from '../pages/AdminListCourses';
import AdminListNotes from '../pages/AdminListNotes';

/* Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        {/* General routes */}
        <Route exact path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* Course routes */}
        <Route path="/courses" element={<ListCourses />} />
        <Route path="/courses/:path" element={<ProtectedRoute><Course /></ProtectedRoute>} />
        <Route path="/addCourse" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />

        {/* Note routes */}
        <Route path="/notes" element={<ListNotes />} />
        <Route path="/notes/:_id" element={<ProtectedRoute><Note /></ProtectedRoute>} />
        <Route path="/addNote" element={<ProtectedRoute><AddNote /></ProtectedRoute>} />

        {/* Profile routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admincourses" element={<AdminProtectedRoute><AdminListCourses /></AdminProtectedRoute>} />
        <Route path="/adminnotes" element={<AdminProtectedRoute><AdminListNotes /></AdminProtectedRoute>} />
        <Route path="/adminprofiles" element={<AdminProtectedRoute><AdminListProfiles /></AdminProtectedRoute>} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Home />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <Home />,
};

export default App;
