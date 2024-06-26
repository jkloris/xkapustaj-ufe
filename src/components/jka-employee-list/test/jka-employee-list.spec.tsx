import { newSpecPage } from '@stencil/core/testing';
import { JkaEmployeeList } from '../jka-employee-list';

describe('jka-employee-list', () => {
  it('should render filter inputs and employee list', async () => {
    const page = await newSpecPage({
      components: [JkaEmployeeList],
      html: `<jka-employee-list></jka-employee-list>`
    });

    expect(page.root).not.toBeNull();

    // Check if filter inputs are rendered
    const filterInputs = page.root.shadowRoot.querySelectorAll('md-filled-text-field');
    expect(filterInputs.length).toBe(2); 

  });

  it('should filter employees by name', async () => {
    const page = await newSpecPage({
      components: [JkaEmployeeList],
      html: `<jka-employee-list></jka-employee-list>`
    });

    const filterInput = page.root.shadowRoot.querySelectorAll('md-filled-text-field')[0];
    filterInput.value = 'Marekwdawda';
    await filterInput.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    const filteredEmployees = page.root.shadowRoot.querySelectorAll('.employee-grid md-list-item div[slot="headline"]');
    expect(filteredEmployees.length).toBe(0); // Expect one employee with name "John"
  });

  it('should filter employees by job title', async () => {
    const page = await newSpecPage({
      components: [JkaEmployeeList],
      html: `<jka-employee-list></jka-employee-list>`
    });

    const filterInput = page.root.shadowRoot.querySelectorAll('md-filled-text-field')[1];
    filterInput.value = 'Dawwadwaodsc';
    await filterInput.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    const filteredEmployees = page.root.shadowRoot.querySelectorAll('.employee-grid md-list-item div[slot="supporting-text"]');
    expect(filteredEmployees.length).toBe(0); // Expect one employee with job title "Software Engineer"
  });
});
