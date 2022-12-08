import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { adminListCoursesPage } from '../adminListCourses.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'foo', firstName: 'Admin', lastName: 'Foo' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test Admin Delete Course', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signinAdmin(testController, credentials.username, credentials.password);
  await navBar.gotoAdminListCoursesPage(testController);
  await adminListCoursesPage.isDisplayed(testController);
  await adminListCoursesPage.deleteCourse(testController);
});
