import { newSpecPage } from '@stencil/core/testing';
import { JkaTimesheet } from '../jka-timesheet';

describe('jka-timesheet', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JkaTimesheet],
      html: `<jka-timesheet></jka-timesheet>`,
    });
    expect(page.root).toEqualHtml(`
      <jka-timesheet>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </jka-timesheet>
    `);
  });
});
