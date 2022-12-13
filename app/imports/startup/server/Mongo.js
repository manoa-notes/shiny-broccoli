import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { Courses } from '../../api/course/Courses';
import { Notes } from '../../api/note/Note';
import { Ratings } from '../../api/rating/Rating';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, email, bio, picture, courseInterests, role }) {
  console.log(`  Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, email, bio, picture, courseInterests });
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

// Initialize the database with a default data document.
const addCourse = (course) => {
  Courses.collection.insert(course);
};

// Initialize the StuffsCollection if empty.
if (Courses.collection.find().count() === 0) {
  if (Meteor.settings.defaultCourses) {
    console.log('Creating default courses.');
    Meteor.settings.defaultCourses.forEach(course => {
      console.log(`  Adding: ${course.name}`);
      addCourse(course);
    });
  }
}

const addNote = (note) => {
  Notes.collection.insert(note);
};

// Initialize the StuffsCollection if empty.
if (Notes.collection.find().count() === 0) {
  if (Meteor.settings.defaultNotes) {
    console.log('Creating default notes.');
    Meteor.settings.defaultNotes.forEach(note => {
      console.log(`  Adding: ${note.title}`);
      addNote(note);
    });
  }
}

const addRatings = (notes) => {
  const ratings = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
  const owners = Profiles.collection.find().fetch();
  notes.map(note => (
    owners.map(owner => (
      Ratings.collection.insert({ noteID: note._id, ownerID: owner.email, rating: _.sample(ratings) })
    ))
  ));
};

if ((Meteor.settings.loadCoursesFile) && (Courses.collection.find().count() < 10)) {
  const assetsFileName = 'courses.json';
  console.log(`Loading courses from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.courses.map(course => addCourse(course));
}

if ((Meteor.settings.loadNotesFile) && (Notes.collection.find().count() < 10)) {
  const assetsFileName = 'notes.json';
  console.log(`Loading notes from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.notes.map(note => addNote(note));
  const notes = Notes.collection.find().fetch();
  addRatings(notes);
}
