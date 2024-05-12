import { newSpecPage } from '@stencil/core/testing';
import { JkaPersonalPage } from '../jka-personal-page';

describe('jka-personal-page', () => {
  it('calls componentWillLoad and sets employee and timesheet', async () => {
    const page = await newSpecPage({
      components: [JkaPersonalPage],
      html: '<jka-personal-page></jka-personal-page>',
    });
  
    const component = page.rootInstance;
    await component.componentWillLoad();
  
    expect(component.employee).toBeDefined();
    expect(component.timesheet).toBeDefined();
  });

});
