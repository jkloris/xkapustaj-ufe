import { newSpecPage } from '@stencil/core/testing';
import { JkaPersonalPage } from '../jka-personal-page';

describe('jka-personal-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JkaPersonalPage],
      html: `<jka-personal-page></jka-personal-page>`,
    });
    expect(page.root).toEqualHtml(`
      <jka-personal-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </jka-personal-page>
    `);
  });
});
