import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddCoursePage {
  constructor() {
    this.pageId = `#${PageIDs.addCoursePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new course */
  async addCourse(testController) {
    const name = 'Test-Course ABC123';
    await this.isDisplayed(testController);
    // Define the new course
    await testController.typeText(`#${ComponentIDs.addCourseName}`, name);
    await testController.click(`#${ComponentIDs.addCourseSubmit} input.btn.btn-primary`);
  }
}

export const addCoursePage = new AddCoursePage();
