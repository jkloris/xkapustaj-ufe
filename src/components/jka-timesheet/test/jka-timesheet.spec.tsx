import { newSpecPage } from '@stencil/core/testing';
import { JkaTimesheet } from '../jka-timesheet';

describe('jka-timesheet', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JkaTimesheet],
      html: `<jka-timesheet></jka-timesheet>`,
    });
    expect(page.root).not.toBeNull();
  });
});
