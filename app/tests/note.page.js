import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class NotePage {
  constructor() {
    this.pageId = `#${PageIDs.notePage}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async rateNote(testController) {
    await testController.click(`#${ComponentIDs.addNoteInCourseButton}`);

    await this.isDisplayed(testController);

    // Select one Course.
    const Selected = Selector(`#${ComponentIDs.ratingSelector}`);
    await testController.click(Selected.nth(3));

    await testController.click(`#${ComponentIDs.addNoteFormSubmit} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const notePage = new NotePage();
