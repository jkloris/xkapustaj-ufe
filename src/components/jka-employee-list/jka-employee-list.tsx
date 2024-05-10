import { Component, EventEmitter, Prop, State, h, Event } from '@stencil/core';
import { iEmployee } from '../../models/iEmployee';
import { JkaEmployeeListApiFactory, EmployeeListEntry} from '../../api/xkapustaj-wl';

@Component({
  tag: 'jka-employee-list',
  styleUrl: 'jka-employee-list.css',
  shadow: true,
})
export class JkaEmployeeList {
  @Prop()  apiBase: string;
  @Prop() ambulanceId: string;
  @State() errorMessage: string;

  @Event({eventName:"employee-clicked"}) employeeClicked: EventEmitter<iEmployee>;
  
  // @State() employees: iEmployee[] = [
  //   { name: 'John Doe', jobTitle: 'Software Engineer', id: '1' },
  //   { name: 'Jane Smith', jobTitle: 'Product Manager', id: '2' },
  //   { name: 'Michael Johnson', jobTitle: 'Data Analyst', id: '3' },
  //   { name: 'Emily Brown', jobTitle: 'UI/UX Designer', id: '4' },
  //   { name: 'Sarah Adams', jobTitle: 'Marketing Specialist', id: '5' },
  //   { name: 'Robert Lee', jobTitle: 'Project Manager', id: '6' },
  //   { name: 'Laura Wilson', jobTitle: 'HR Coordinator', id: '7' },
  //   { name: 'Daniel Taylor', jobTitle: 'Business Analyst', id: '8' },
  //   { name: 'Olivia Garcia', jobTitle: 'Graphic Designer', id: '9' },
  //   { name: 'James Martinez', jobTitle: 'Frontend Developer', id: '10' },
  //   { name: 'Sophia Anderson', jobTitle: 'Sales Manager', id: '11' },
  //   { name: 'David Thomas', jobTitle: 'Quality Assurance Engineer', id: '12' },
  //   { name: 'Emma White', jobTitle: 'Content Writer', id: '13' },
  //   { name: 'Matthew Clark', jobTitle: 'Operations Manager', id: '14' },
  
  // ];

  @State() filteredEmployees: iEmployee[] = [];

  async filterEmployees(event: Event, key: string) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    const emp = await this.getEmployees();
    this.filteredEmployees =emp.filter(employee => {
      if (typeof employee[key] !== "string") return false
      
      return employee[key].toLowerCase().includes(value);
    }
    );
  }

  async componentWillLoad() {
    this.filteredEmployees = [...await this.getEmployees()];
  }

  employeeSelect(employee: iEmployee) {
    this.employeeClicked.emit(employee);

  }

  private async getEmployees(): Promise<EmployeeListEntry[]> {
    try {
      const response = await
        JkaEmployeeListApiFactory(undefined, this.apiBase).
          getEmployeeListEntries(this.ambulanceId)
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of waiting patients: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of waiting patients: ${err.message || "unknown"}`
    }
    return [];
  }
  render() {
    return (
      
      <div class="full-height"  >
        <div class="filter-container">
          <md-filled-text-field label="Search by Name" onInput={(event: Event) => this.filterEmployees(event, 'name')} >  </md-filled-text-field>
          <md-filled-text-field label="Search by Job Title" onInput={(event: Event) => this.filterEmployees(event, 'jobTitle')}>  </md-filled-text-field>
        </div>
          {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          :
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
      }
      </div>
    );
  }
}


