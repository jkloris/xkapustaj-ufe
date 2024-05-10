import { iTimesheet } from "./iTimesheet";

export interface iEmployee {
    name: string;
    jobTitle: string;
    timesheet?: iTimesheet[]
    id:string
  }