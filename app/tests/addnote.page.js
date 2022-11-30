import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class AddNotePage {
  constructor() {
    this.pageId = `#${PageIDs.addNotePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new note */
  async addNote(testController) {
    const name = `radgrad-${new Date().getTime()}`;
    const picture = 'https://www.radgrad.org/img/radgrad_logo.png';
    const description = 'Growing awesome computer scientists, one graduate at a time.';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText(`#${ComponentIDs.addNoteFormTitle}`, name);
    await testController.typeText(`#${ComponentIDs.addNoteFormPicture}`, picture);
    await testController.typeText(`#${ComponentIDs.addNoteFormDescription}`, description);

    // Select one course.
    const interestsSelector = Selector(`#${ComponentIDs.addProjectFormInterests} div.form-check input`);
    await testController.click(interestsSelector.nth(0));

    await testController.click(`#${ComponentIDs.addNoteFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addNotePage = new AddNotePage();
