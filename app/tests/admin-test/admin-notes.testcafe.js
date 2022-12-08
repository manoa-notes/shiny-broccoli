import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { adminListNotesPage } from '../adminListNotes.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'foo', firstName: 'Admin', lastName: 'Foo' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test Admin Delete Note', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signinAdmin(testController, credentials.username, credentials.password);
  await navBar.gotoAdminListNotesPage(testController);
  await adminListNotesPage.isDisplayed(testController);
  await adminListNotesPage.deleteNote(testController);
});
