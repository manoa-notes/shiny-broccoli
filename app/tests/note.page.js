import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class NotePage {
  constructor() {
    this.pageId = `#${PageIDs.notePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this notePage is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 20 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }

  async rateNote(testController) {
    const courseSelector = Selector(`#${ComponentIDs.addRating}`);
    await testController.click(courseSelector.nth(0));
  }
}
export const notePage = new NotePage();
