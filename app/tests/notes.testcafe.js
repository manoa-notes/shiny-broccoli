import { signInPage } from './signin.page';
import { navBar } from './navbar.component';
import { listNotesPage } from './listNotes.page';
import { addNotePage } from './addnote.page';
import { notePage } from './note.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Rainbow Notes localhost test with default db')
  .page('http://localhost:3000');

test('Test the Notes functionality', async (testController) => {
  // log in
  await navBar.ensureLogout(testController);
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  // navigate and add note
  await navBar.gotoListNotesPage(testController);
  await listNotesPage.gotoAddNotePage(testController);
  await addNotePage.isDisplayed(testController);
  // rate the note
  await addNotePage.addNote(testController);
  await navBar.gotoListNotesPage(testController);
  await listNotesPage.seeNote(testController);
  await notePage.rateNote(testController);
});
