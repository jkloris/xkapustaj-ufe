import { newSpecPage } from '@stencil/core/testing';
import { JkaApp } from '../jka-app';

describe('jka-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JkaApp],
      html: `<jka-app></jka-app>`,
    });
    expect(page.root).not.toBeNull();
  });
});
