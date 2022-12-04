import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { listCoursesPage } from '../listCourses.page';
import { addCoursePage } from '../addcourse.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test the Courses functionality', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
  await listCoursesPage.addCourse(testController);
  await addCoursePage.isDisplayed(testController);
  await addCoursePage.addCourse(testController);
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
  await listCoursesPage.gotoCourse(testController);
});
