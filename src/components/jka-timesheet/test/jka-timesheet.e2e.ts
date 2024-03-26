import { newE2EPage } from '@stencil/core/testing';

describe('jka-timesheet', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<jka-timesheet></jka-timesheet>');

    const element = await page.find('jka-timesheet');
    expect(element).toHaveClass('hydrated');
  });
});
