import { Component, EventEmitter, Prop, State, h, Event } from '@stencil/core';
import { iEmployee } from '../../models/iEmployee';

@Component({
  tag: 'jka-employee-list',
  styleUrl: 'jka-employee-list.css',
  shadow: true,
})
export class JkaEmployeeList {
  @Prop()  apiBase: string;
  @Event({eventName:"employee-clicked"}) employeeClicked: EventEmitter<iEmployee>;
  
  @State() employees: iEmployee[] = [
    { name: 'John Doe', jobTitle: 'Software Engineer', id: '1' },
    { name: 'Jane Smith', jobTitle: 'Product Manager', id: '2' },
    { name: 'Michael Johnson', jobTitle: 'Data Analyst', id: '3' },
    { name: 'Emily Brown', jobTitle: 'UI/UX Designer', id: '4' },
    { name: 'Sarah Adams', jobTitle: 'Marketing Specialist', id: '5' },
    { name: 'Robert Lee', jobTitle: 'Project Manager', id: '6' },
    { name: 'Laura Wilson', jobTitle: 'HR Coordinator', id: '7' },
    { name: 'Daniel Taylor', jobTitle: 'Business Analyst', id: '8' },
    { name: 'Olivia Garcia', jobTitle: 'Graphic Designer', id: '9' },
    { name: 'James Martinez', jobTitle: 'Frontend Developer', id: '10' },
    { name: 'Sophia Anderson', jobTitle: 'Sales Manager', id: '11' },
    { name: 'David Thomas', jobTitle: 'Quality Assurance Engineer', id: '12' },
    { name: 'Emma White', jobTitle: 'Content Writer', id: '13' },
    { name: 'Matthew Clark', jobTitle: 'Operations Manager', id: '14' },
  
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
    this.employeeClicked.emit(employee);

  }

  render() {
    return (
      
      <div class="full-height"  >
        <div class="filter-container">
          <md-filled-text-field label="Search by Name" onInput={(event: Event) => this.filterEmployees(event, 'name')} >  </md-filled-text-field>
          <md-filled-text-field label="Search by Job Title" onInput={(event: Event) => this.filterEmployees(event, 'jobTitle')}>  </md-filled-text-field>
        </div>
          
          
          <md-list class="employee-grid">
          {this.filteredEmployees.map(employee => (
            <div class="employee-item" >
              
              <md-list-item  on-click={() => this.employeeSelect(employee)}>
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


