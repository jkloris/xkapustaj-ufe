import { Component, EventEmitter, Prop, State, h, Event } from '@stencil/core';
import { iEmployee } from '../../models/iEmployee';
import { iTimesheet } from '../../models/iTimesheet';
import { JkaTimesheetApiFactory, Timesheet} from '../../api/xkapustaj-wl';

@Component({
  tag: 'jka-timesheet',
  styleUrl: 'jka-timesheet.css',
  shadow: true,
})
export class JkaTimesheet {

  @Event({eventName: "timesheet-closed"}) closed: EventEmitter<string>;


  @Prop() worker: string = "";
  
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;
  @State() errorMessage: string;

  @State() employee: iEmployee = {
    name: "John Doe",
    jobTitle:  "Software Engineer",
    id: "1",
    timesheet: '1'
  
  }

  timesheet: iTimesheet[] =[
    // { id: "1", date: '2022-01-01', hours: 8, description: 'Worked on project A' },
    // { id: "1", date: '2022-01-02', hours: 6, description: 'Worked on project B' },
    // { id: "1", date: '2022-01-03', hours: 10, description: 'Worked on project C' },
    // { id: "1", date: '2022-01-04', hours: 4, description: 'Worked on project D' },
    // { id: "1", date: '2022-01-05', hours: 12, description: 'Worked on project E' }, 
    // { id: "1", date: '2022-01-06', hours: 8, description: 'Worked on project F' },
    // { id: "1", date: '2022-01-07', hours: 6, description: 'Worked on project G' },
    // { id: "1", date: '2022-01-08', hours: 10, description: 'Worked on project H' },
    // { id: "1", date: '2022-01-09', hours: 4, description: 'Worked on project I' },
    // { id: "1", date: '2022-01-10', hours: 12, description: 'Worked on project J' },

  ]  
  async componentWillLoad() {
    this.timesheet = [...await this.getTimesheet()];
  }

  private async getTimesheet(): Promise<Timesheet[]> {
    try {
      const response = await
        JkaTimesheetApiFactory(undefined, this.apiBase).
          getEmployeeTimesheet(this.ambulanceId, this.employee.id)
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve timesheet: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve timesheet: ${err.message || "unknown"}`
    }
    return [];
  }

  render() {
    return (
      <div class={"container"}>
        
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

        {
        this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
        :
          <div class="table-container">
            <table> 
              <thead>

              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>

              {this.timesheet.map(jobs => (
                <tr class="grid-row">
                  <td>{jobs.date}</td>
                  <td>{jobs.hours}</td>
                  <td>{jobs.description}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        }
        <md-elevated-button  on-click={() => this.closed.emit("close")}  >Back</md-elevated-button>
        <md-elevated-button>Add Task</md-elevated-button>
        <md-elevated-button>Delete Task</md-elevated-button>
      </div>
    );
  }
}
