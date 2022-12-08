import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { homePage } from '../home.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'user@foo.com', password: 'foo', firstName: 'User', lastName: 'Foo' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test Home Functionality', async (testController) => {
  // login
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signinUser(testController, credentials.username, credentials.password);
  // navigate to Home
  await navBar.gotoHomePage(testController);
  await homePage.isDisplayed(testController);
});
