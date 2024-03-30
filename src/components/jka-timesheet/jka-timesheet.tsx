import { Component, Prop, State, h ,Event, EventEmitter} from '@stencil/core';
import { iEmployee } from '../../models/iEmployee';


@Component({
  tag: 'jka-timesheet',
  styleUrl: 'jka-timesheet.css',
  shadow: true,
})
export class JkaTimesheet {

  @Event({eventName: "timesheet-closed"}) closed: EventEmitter<string>;


  @Prop() worker: iEmployee = {
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    timesheet: []
  };
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;
  
  @State() employee: iEmployee = {
    name: this.worker.name,
    jobTitle:  this.worker.jobTitle,
    timesheet: [
      { date: '2022-01-01', hours: 8, description: 'Worked on project A' },
      { date: '2022-01-02', hours: 6, description: 'Worked on project B' },
      { date: '2022-01-03', hours: 10, description: 'Worked on project C' },
      { date: '2022-01-04', hours: 4, description: 'Worked on project D' },
      { date: '2022-01-05', hours: 12, description: 'Worked on project E' }, 
      { date: '2022-01-06', hours: 8, description: 'Worked on project F' },
      { date: '2022-01-07', hours: 6, description: 'Worked on project G' },
      { date: '2022-01-08', hours: 10, description: 'Worked on project H' },
      { date: '2022-01-09', hours: 4, description: 'Worked on project I' },
      { date: '2022-01-10', hours: 12, description: 'Worked on project J' },

    ]
  
  }
  render() {
    return (
      <div>
        <md-list>

         <md-list-item >
              <div slot='headline'>Name: </div>
              <div slot='supporting-text'>{this.employee.name}</div>
            </md-list-item>
            <md-divider></md-divider>
            <md-list-item >
            <div slot='headline'>Job Position: </div>

              <div slot='supporting-text'> {this.employee.jobTitle}</div>
            </md-list-item>
        </md-list>

        <table> 
          <thead>

          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>

          {this.employee.timesheet.map(jobs => (
            <tr class="grid-row">
              <td>{jobs.date}</td>
              <td>{jobs.hours}</td>
              <td>{jobs.description}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <md-elevated-button  on-click={() => this.closed.emit("close")}  >Back</md-elevated-button>
        <md-elevated-button>Add Task</md-elevated-button>

      </div>
    );
  }
}
