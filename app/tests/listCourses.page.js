import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class ListCoursesPage {
  constructor() {
    this.pageId = `#${PageIDs.listCoursesPage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this USER listCoursesPage is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 20 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }

  async addCourse(testController) {
    await testController.click(`#${ComponentIDs.addCourseButton}`);
  }

  async gotoCourse(testController) {
    const testCourse = 'Test-Course ABC123';
    const courseSelector = Selector(`#${ComponentIDs.courseButton}`);
    await testController.click(courseSelector.withText(testCourse));
  }
}

export const listCoursesPage = new ListCoursesPage();
