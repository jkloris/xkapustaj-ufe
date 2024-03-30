import { Component, State, h } from '@stencil/core';
import { iEmployee } from '../../models/iEmployee';

@Component({
  tag: 'jka-employee-list',
  styleUrl: 'jka-employee-list.css',
  shadow: true,
})
export class JkaEmployeeList {
  // @Prop()  apiBase: string;
  
  @State() employees: iEmployee[] = [
    { name: 'John Doe', jobTitle: 'Software Engineer' },
    { name: 'Jane Smith', jobTitle: 'Product Manager' },
    { name: 'Michael Johnson', jobTitle: 'Data Analyst' },
    { name: 'Emily Brown', jobTitle: 'UI/UX Designer' },
    { name: 'Sarah Adams', jobTitle: 'Marketing Specialist' },
    { name: 'Robert Lee', jobTitle: 'Project Manager' },
    { name: 'Laura Wilson', jobTitle: 'HR Coordinator' },
    { name: 'Daniel Taylor', jobTitle: 'Business Analyst' },
    { name: 'Olivia Garcia', jobTitle: 'Graphic Designer' },
    { name: 'James Martinez', jobTitle: 'Frontend Developer' },
    { name: 'Sophia Anderson', jobTitle: 'Sales Manager' },
    { name: 'David Thomas', jobTitle: 'Quality Assurance Engineer' },
    { name: 'Emma White', jobTitle: 'Content Writer' },
    { name: 'Matthew Clark', jobTitle: 'Operations Manager' },
  ];

  @State() filteredEmployees: iEmployee[] = [];

  filterEmployees(event: Event, key: string) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEmployees = this.employees.filter(employee => {
      if (typeof employee[key] !== "string") return false
      
      return employee[key].toLowerCase().includes(value);
    }
    );
  }

  componentWillLoad() {
    // Initialize filteredEmployees with all employees initially
    this.filteredEmployees = [...this.employees];
  }

  employeeSelect(employee: iEmployee) {
    console.log(employee);

  }

  render() {
    return (
      <div class="full-height" >
      <div class="filter-container">
        <md-filled-text-field label="Search by Name" onInput={(event: Event) => this.filterEmployees(event, 'name')} >  </md-filled-text-field>
        <md-filled-text-field label="Search by Job Title" onInput={(event: Event) => this.filterEmployees(event, 'jobTitle')}>  </md-filled-text-field>
      </div>
        
        
        <md-list class="employee-grid">
        {this.filteredEmployees.map(employee => (
          <div>
            <md-list-item class="employee-item" on-click={() => this.employeeSelect(employee)}>
              <div slot='headline'>{employee.name}</div>
              <div slot='supporting-text'> {employee.jobTitle}</div>
            </md-list-item>
            <md-divider></md-divider>
          </div>
        ))}
      </md-list>

      </div>
    );
  }
}


