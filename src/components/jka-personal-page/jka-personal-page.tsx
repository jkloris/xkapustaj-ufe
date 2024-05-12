import { Component, EventEmitter, Prop, State, h , Event} from '@stencil/core';
import { EmployeeListEntry, Timesheet, JkaEmployeeApiFactory, JkaTimesheetsApiFactory } from '../../api/xkapustaj-wl';

@Component({
  tag: 'jka-personal-page',
  styleUrl: 'jka-personal-page.css',
  shadow: true,
})
export class JkaPersonalPage {

  @Event({eventName: "personal-closed"}) closed: EventEmitter<string>;


  @Prop() worker: string = "";
  
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;
  @State() errorMessage: string;

  private employee: EmployeeListEntry;

  @State() timesheet: Timesheet[] =[ ]  
;




  async componentWillLoad() {
    console.log(this.worker)
    this.timesheet = [...await this.getTimesheet()];
    this.employee = await this.getEmployee();
    this.aggregateTimesheets(this.timesheet)
  }

  private async getEmployee(): Promise<EmployeeListEntry> {
    try {
      const response = await
      JkaEmployeeApiFactory(undefined, this.apiBase).
          getEmployee(this.ambulanceId, this.worker)
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve employee: ${response.statusText}`
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve employee: ${err.message || "unknown"}`
    }
    return {} as EmployeeListEntry;

  }

  private async getTimesheet(): Promise<Timesheet[]> {
    try {
      const response = await
      JkaTimesheetsApiFactory(undefined, this.apiBase).
          getEmployeeTimesheet(this.ambulanceId,this.worker)
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

  aggregateTimesheets(timesheet: Timesheet[]): { description: string; totalHours: number; doneHours: number }[] {
    const totalHoursAgg: { [description: string]: number } = {};
    const doneHoursAgg: { [description: string]: number } = {};
    const d = new Date()
    for (const obj of timesheet) {
      const { description, hours } = obj;
     
      if (description in totalHoursAgg) {
        totalHoursAgg[description] += hours;
        if(d > new Date(obj.date)) {
          doneHoursAgg[description] += hours
        }
      } else {
        totalHoursAgg[description] = hours;
        if(d > new Date(obj.date)) {
          doneHoursAgg[description] = hours
        }
      }
    }
  
    const result: { description: string; totalHours: number; doneHours: number }[] = [];
    for (const description in totalHoursAgg) {
      const totalHours = totalHoursAgg[description];
      const doneHours = doneHoursAgg[description];
      
      result.push({ description, totalHours, doneHours });
    }
    console.log(result)
    return result;
  }






  render() {
    return (
      <div class={"container"}>
        <div class={"header-container"}>
          <h3>{this.employee.name} | {this.employee.jobTitle}</h3>
          <md-elevated-button  on-click={() => this.closed.emit(this.worker)}  >Back</md-elevated-button>
        </div>
        <md-list style={{marginTop: "10px"}}>

        {this.aggregateTimesheets(this.timesheet).map((obj) =>(
          <div>

            <md-list-item >
                  <div slot='headline'>{obj.description}: </div>
                  <div slot='supporting-text'>Hours total: {obj.totalHours} | Hours done: {obj.doneHours ?? 0} | Hours awaiting: {obj.totalHours - obj.doneHours ?? 0}</div>
            </md-list-item>
            <md-divider></md-divider>
          </div>

            )
          )
        }
        </md-list>

        {
        this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
        : <div></div>}
        <div class="table-container">

        </div>
      
        </div>
    );
  }
}

