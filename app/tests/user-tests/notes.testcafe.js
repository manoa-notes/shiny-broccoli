import { signInPage } from '../signin.page';
import { navBar } from '../navbar.component';
import { listNotesPage } from '../listNotes.page';
import { addNotePage } from '../addnote.page';
import { notePage } from '../note.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'foo', firstName: 'Admin', lastName: 'Foo' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test Notes Functionality', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoListNotesPage(testController);
  await listNotesPage.isDisplayed(testController);
  await listNotesPage.gotoAddNotePage(testController);
  await addNotePage.isDisplayed(testController);
  await addNotePage.addNote(testController);
  await listNotesPage.gotoNote(testController);
  await notePage.isDisplayed(testController);
  await notePage.rateNote(testController);
});
