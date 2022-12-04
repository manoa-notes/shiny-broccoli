import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AdminListNotesPage {
  constructor() {
    this.pageId = `#${PageIDs.adminListNotesPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 20 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }

  async gotoAddNotePage(testController) {
    await testController.click(`#${ComponentIDs.addNoteLink}`);
  }

  async deleteNote(testController) {
    const testCourse = 'Test Note';
    const courseSelector = Selector(`#${ComponentIDs.removeNote} btn.btn-danger`);
    await testController.click(courseSelector.withText(testCourse));
  }
}
export const adminListNotesPage = new AdminListNotesPage();
