import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { listCoursesPage } from '../listCourses.page';
import { addCoursePage } from '../addcourse.page';
import { coursePageEmpty } from '../courseEmpty.page';
import { landingPage } from '../landing.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test User adding a Course then adding a Note to that course', async (testController) => {
  await navBar.ensureLogout(testController);
  await landingPage.isDisplayedFastKine(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.addCourse(testController);
  await addCoursePage.addCourse(testController);
  await listCoursesPage.gotoCourse(testController);
  await coursePageEmpty.isDisplayed(testController);
  await coursePageEmpty.addNote(testController);
});
