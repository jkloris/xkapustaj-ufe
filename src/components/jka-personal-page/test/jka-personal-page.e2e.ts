import { newE2EPage } from '@stencil/core/testing';

describe('jka-personal-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jka-personal-page></jka-personal-page>');

    const element = await page.find('jka-personal-page');
    expect(element).toHaveClass('hydrated');
  });
});
