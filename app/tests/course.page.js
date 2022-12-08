import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class CoursePage {
  constructor() {
    this.pageId = `#${PageIDs.coursePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this coursePage is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async addNote(testController) {
    await testController.click(`#${ComponentIDs.addNoteInCourseButton}`);
    const name = `Test-Title-${new Date().getTime()}`;
    const picture = 'https://cammoore.github.io/img/cam-moore.jpg';
    const description = 'Test-Description';
    await this.isDisplayed(testController);
    // Define the new Note
    await testController.typeText(`#${ComponentIDs.addNoteFormTitle}`, name);
    await testController.typeText(`#${ComponentIDs.addNoteFormPicture}`, picture);
    await testController.typeText(`#${ComponentIDs.addNoteFormDescription}`, description);

    // Select one Course.
    const testCourse = 'Test-Course ABC123';
    const courseSelector = Selector(`#${ComponentIDs.addNoteRadio}`);
    await testController.click(courseSelector.withText(testCourse));

    await testController.click(`#${ComponentIDs.addNoteFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const coursePage = new CoursePage();
