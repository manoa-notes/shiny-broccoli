import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
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
import Admin from '../pages/Admin';
import RemoveCourse from '../components/RemoveCourse';
import RemoveNote from '../components/RemoveNote';

/* Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        {/* Routes from Rainbow-Notes template */}
        <Route exact path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* Course routes */}
        <Route path="/courses" element={<ProtectedRoute><ListCourses /></ProtectedRoute>} />
        <Route path="/courses/:path" element={<ProtectedRoute><Course /></ProtectedRoute>} />
        <Route path="/addCourse" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
        <Route path="/removeCourse" element={<ProtectedRoute><RemoveCourse /></ProtectedRoute>} />

        {/* Note routes */}
        <Route path="/notes" element={<ProtectedRoute><ListNotes /></ProtectedRoute>} />
        <Route path="/notes/:_id" element={<ProtectedRoute><Note /></ProtectedRoute>} />
        <Route path="/addNote" element={<ProtectedRoute><AddNote /></ProtectedRoute>} />
        <Route path="/removeNote" element={<ProtectedRoute><RemoveNote /></ProtectedRoute>} />
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

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Home />,
};

export default App;
