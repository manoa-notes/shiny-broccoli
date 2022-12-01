import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { Notes } from '../../api/note/Note';
import { Courses } from '../../api/course/Courses';
import { Ratings } from '../../api/rating/Rating';

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this note. */
Meteor.publish(Notes.userPublicationName, () => Notes.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(Courses.userPublicationName, () => Courses.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(Ratings.userPublicationName, () => Ratings.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
