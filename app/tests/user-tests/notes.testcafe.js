import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { listNotesPage } from '../listNotes.page';
import { addNotePage } from '../addnote.page';
import { notePage } from '../note.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'user@foo.com', password: 'foo', firstName: 'User', lastName: 'Foo' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test Notes Functionality', async (testController) => {
  // login
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signinUser(testController, credentials.username, credentials.password);
  // navigate to list Notes
  await navBar.gotoListNotesPage(testController);
  await listNotesPage.isDisplayed(testController);
  // add a Note
  await listNotesPage.gotoAddNotePage(testController);
  await addNotePage.isDisplayed(testController);
  await addNotePage.addNote(testController);
  // rate the note
  await navBar.gotoListNotesPage(testController);
  await listNotesPage.gotoNote(testController);
  await notePage.isDisplayed(testController);
  // await notePage.rateNote(testController);
});
