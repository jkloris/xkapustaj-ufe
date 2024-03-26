import { newE2EPage } from '@stencil/core/testing';

describe('jka-employee-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jka-employee-list></jka-employee-list>');

    const element = await page.find('jka-employee-list');
    expect(element).toHaveClass('hydrated');
  });
});
