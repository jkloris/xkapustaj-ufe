import { newE2EPage } from '@stencil/core/testing';

describe('jka-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jka-app></jka-app>');

    const element = await page.find('jka-app');
    expect(element).toHaveClass('hydrated');
  });
});
