import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { listCoursesPage } from '../listCourses.page';
import { addCoursePage } from '../addcourse.page';
import { coursePage } from '../course.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test the Courses functionality', async (testController) => {
  // login
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  // navigate to course
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
  // add a course
  await listCoursesPage.addCourse(testController);
  await addCoursePage.isDisplayed(testController);
  await addCoursePage.addCourse(testController);
  // navigate to added course
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
  await listCoursesPage.gotoCourse(testController);
});

test.only('Test the Courses Availability', async (testController) => {
  // login availability
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.isDisplayed(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  // navigate to list courses and check availability
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
  // navigate to addCourse and check availability
  await listCoursesPage.addCourse(testController);
  await addCoursePage.isDisplayed(testController);
  // navigate to listCourse again and check availability
  await navBar.gotoListCoursesPage(testController);
  await listCoursesPage.isDisplayed(testController);
  // navigate to a course and check availability
  await listCoursesPage.gotoCourse(testController);
  await coursePage.isDisplayed(testController);
});
