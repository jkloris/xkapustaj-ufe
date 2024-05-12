import { Component, EventEmitter, Prop, State, h, Event } from '@stencil/core';
import {JkaTimesheetsApiFactory,  Timesheet, EmployeeListEntry, JkaEmployeeApiFactory, JkaTimesheetApiFactory} from '../../api/xkapustaj-wl';

@Component({
  tag: 'jka-timesheet',
  styleUrl: 'jka-timesheet.css',
  shadow: true,
})
export class JkaTimesheet {

  @Event({eventName: "timesheet-closed"}) closed: EventEmitter<string>;
  @Event({eventName: "timesheet-personal"}) personal: EventEmitter<string>;


  @Prop() worker: string = "";
  
  @Prop() ambulanceId: string;
  @Prop() apiBase: string;
  @State() errorMessage: string;

  private employee: EmployeeListEntry;

  @State() timesheet: Timesheet[] =[ ]  
  @State() selectedTimesheet: Timesheet = null;


  private selectTimesheet(timesheet: Timesheet) {
    if(this.selectedTimesheet != null && this.selectedTimesheet.id == timesheet.id) {
      this.selectedTimesheet = null
      return
    }
    this.selectedTimesheet = timesheet
  }

  async componentWillLoad() {
    console.log(this.worker)
    this.timesheet = [...await this.getTimesheet()];
    this.employee = await this.getEmployee();
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

  private async deleteTimesheetEntry(id: string) {
    try {
       const response = await JkaTimesheetApiFactory(undefined, this.apiBase)
          .deleteTimesheetEntry(this.ambulanceId, id)
       if (response.status < 299) {
        this.selectedTimesheet = null
        this.timesheet = [...await this.getTimesheet()];
       } else {
       this.errorMessage = `Cannot delete entry: ${response.statusText}`
       }
    } catch (err: any) {
       this.errorMessage = `Cannot delete entry: ${err.message || "unknown"}`
    }
 }

 private async updateTimesheetEntry(id: string) {
  try {
    console.log(this.selectedTimesheet) 
     const response = await JkaTimesheetApiFactory(undefined, this.apiBase)
        .updateEmployeeTimesheet(this.ambulanceId, id, this.selectedTimesheet)
     if (response.status < 299) {
      this.selectedTimesheet = null
      this.timesheet = [...await this.getTimesheet()];
     } else {
     this.errorMessage = `Cannot update entry: ${response.statusText}`
     }
  } catch (err: any) {
     this.errorMessage = `Cannot update entry: ${err.message || "unknown"}`
  }
}

private async addTimesheetEntry() {
  try {
    console.log(this.selectedTimesheet) 
     const response = await JkaTimesheetApiFactory(undefined, this.apiBase)
        .addNewTimesheetEntry(this.ambulanceId, this.worker, this.selectedTimesheet)
     if (response.status < 299) {
      this.selectedTimesheet = null
      const ts= await this.getTimesheet()
      //Testing
      if(this.timesheet.length == 0){
        this.timesheet = [this.selectedTimesheet]
      }
      this.timesheet = ts;
     } else {
     this.errorMessage = `Cannot add entry: ${response.statusText}`
     }
  } catch (err: any) {
     this.errorMessage = `Cannot add entry: ${err.message || "unknown"}`
  }
}

 private formatDate(date: string) {
   const d = new Date(date);
   return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;

 }

 private reformatDate(date:string){
   const d = new Date(date);
   return d.toISOString()
 }

 private formatBeautyDate(date: string) {
   const d = new Date(date);
   return d.toLocaleDateString( )
 }

 private isJobDone(date: string) {
   const d = new Date(date);
   return d < new Date();
 }
 
 private handleInput(event: Event, flag: InputAtt) {
  if(this.selectedTimesheet == null) {
    this.selectedTimesheet = {} as Timesheet
    this.selectedTimesheet.id = "-1"
    this.selectedTimesheet.employeeId = this.worker
  }
  
  switch (flag) {
    case InputAtt.date:
      this.selectedTimesheet.date = this.reformatDate((event.target as HTMLInputElement).value)
      break
    case InputAtt.hours:
      this.selectedTimesheet.hours = parseInt((event.target as HTMLInputElement).value, 0);
      break
    case InputAtt.description:
      this.selectedTimesheet.description = (event.target as HTMLInputElement).value
      break;
  
    default:
      break;
  }
    console.log(this.selectedTimesheet)
 }
  render() {
    return (
      <div class={"container"}>
        <div class={"header-container"}>
          <h3>{this.employee.name} | {this.employee.jobTitle}</h3>
          <md-elevated-button  on-click={() => this.personal.emit(this.worker)}  >To Personal Overview</md-elevated-button>
          <md-elevated-button  on-click={() => this.closed.emit("close")}  >Back</md-elevated-button>
        </div>
        {/* <md-list>

         <md-list-item >
              <div slot='headline'>Name: </div>
              <div slot='supporting-text'>{this.employee.name}</div>
            </md-list-item>
            <md-divider></md-divider>
            <md-list-item >
            <div slot='headline'>Job Position: </div>

              <div slot='supporting-text'> {this.employee.jobTitle}</div>
            </md-list-item>
        </md-list> */}

        {
        this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
        : <div></div>}
        <div class="table-container">
          <table> 
            <thead>

            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Done</th>
            </tr>
            </thead>
            <tbody>

            {this.timesheet.map(jobs => (
              <tr class={{"grid-row": true, "selected": this.selectedTimesheet?.id === jobs.id}} on-click={() => this.selectTimesheet(jobs)}>
                <td >{this.formatBeautyDate(jobs.date)}</td>
                <td>{jobs.hours}</td>
                <td>{jobs.description}</td>
                <td>{this.isJobDone(jobs.date)? "Yes": "No"}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      
        
       {/* { this.selectedTimesheet? */}
          <div class={"edit-container"} style={{"box-shadow": "1px 2px 5px 0px #0000008f"}}>
            <md-filled-text-field
                type="date"
                label="Date"
                value={this.formatDate(this.selectedTimesheet?.date)??0}
                onInput={(event: Event) => this.handleInput(event, InputAtt.date)}
              ></md-filled-text-field>
              <md-filled-text-field
                type="number"
                label="Hours"
                value={this.selectedTimesheet?.hours.toString()??0}
                onInput={(event: Event) => this.handleInput(event, InputAtt.hours)}
              ></md-filled-text-field>
              <md-filled-text-field
                label="Description"
                value={this.selectedTimesheet?.description??""}
                onInput={(event: Event) => this.handleInput(event, InputAtt.description)}
              ></md-filled-text-field>
        </div>
        {/* :
        <div class="edit-container w" style={{"box-shadow": "1px 2px 5px 0px #0000008f"}}>
            <md-filled-text-field
                type="date"
                label="Date"
                onInput={(event: Event) => this.handleInput(event, InputAtt.date)}
              ></md-filled-text-field>
              <md-filled-text-field
                type="number"
                label="Hours"
                onInput={(event: Event) => this.handleInput(event, InputAtt.hours)}
              ></md-filled-text-field>
              <md-filled-text-field
                label="Description"
                value={this.selectedTimesheet?.description??""}
                onInput={(event: Event) => this.handleInput(event, InputAtt.description)}
              ></md-filled-text-field>
        </div>
        } */}
        


        
        { this.selectedTimesheet? 
        <div class={"edit-container"}>
          <md-elevated-button on-click={() => this.updateTimesheetEntry(this.selectedTimesheet.id)}>Update Task</md-elevated-button>
          <md-elevated-button class="add-btn"  on-click={() => this.addTimesheetEntry()}>Add Task</md-elevated-button>
          <md-elevated-button class="delete-btn" on-click={() => this.deleteTimesheetEntry(this.selectedTimesheet.id)} >Delete Task</md-elevated-button>
        </div>
          : <div class={"edit-container"}>
             <md-elevated-button class="add-btn"  on-click={() => this.addTimesheetEntry()}>Add Task</md-elevated-button>
          </div>
        }
        </div>
    );
  }
}

enum InputAtt {
  date = "DATE",
  hours = "HOURS",
  description = "DESCRIPTION"
}