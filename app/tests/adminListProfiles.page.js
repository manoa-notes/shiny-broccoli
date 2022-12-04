import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AdminListProfilesPage {
  constructor() {
    this.pageId = `#${PageIDs.adminListProfilesPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 20 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }

  async deleteProfile(testController) {
    const testCourse = 'testprofile@foo.com';
    const courseSelector = Selector(`#${ComponentIDs.removeNote} btn.btn-danger`);
    await testController.click(courseSelector.withText(testCourse));
  }
}
export const adminListProfilesPage = new AdminListProfilesPage();
