import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class ListNotesPage {
  constructor() {
    this.pageId = `#${PageIDs.listNotesPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this USER listNotesPage is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 20 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }

  async gotoAddNotePage(testController) {
    await testController.click(`#${ComponentIDs.addNoteLink}`);
  }

  async gotoNote(testController) {
    const testNote = `Hello-World-${new Date().getDate()}`;
    const courseSelector = Selector(`#${ComponentIDs.seeNoteLink}`);
    await testController.click(courseSelector.withText(testNote));
  }
}
export const listNotesPage = new ListNotesPage();
