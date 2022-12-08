import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { adminListProfilesPage } from '../adminListProfiles.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'foo', firstName: 'Admin', lastName: 'Foo' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test Admin Delete Profile', async (testController) => {
  // login
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signinAdmin(testController, credentials.username, credentials.password);
  // navigate to profile page
  await navBar.gotoAdminListProfilesPage(testController);
  await adminListProfilesPage.isDisplayed(testController);
  // delete testprofile@foo.com
  await adminListProfilesPage.deleteProfile(testController);
});
