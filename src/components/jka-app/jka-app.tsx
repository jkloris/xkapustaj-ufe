import { Component, Host, Prop, State, h } from '@stencil/core';
import { iEmployee } from '../../models/iEmployee';
declare global {
  interface Window { navigation: any; }
}
@Component({
  tag: 'jka-app',
  styleUrl: 'jka-app.css',
  shadow: true,
})
export class JkaApp {

  
  @State() private relativePath = "";

  @Prop() basePath: string="";
  @Prop() apiBase: string;
  @Prop() ambulanceId: string;

  //TMP nav solution

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)
  }

 toTimesheet(employee: iEmployee) {
   console.log(employee)
  //  worker = employee
  //  element = 'timesheet'
   
 }

 toList(event:string){
  console.log(event)
  // this.element = 'list'
 }

 render() {
   let element = "list"
   let worker = ""
   if ( this.relativePath.startsWith("worker/"))
   {
     element = "timesheet";
     worker = this.relativePath.split("/")[1]
   }
 
  //  const navigate = (path:string) => {
  //    const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
  //    window.navigation.navigate(absolute)
  //  }
 
   return (
     <Host>
     {/* onemployee-clicked={(ev: CustomEvent) => this.toTimesheet(ev.detail) } */}
       { element === "list"
       ? <jka-employee-list 
       
       api-base={this.apiBase}
           > 
         </jka-employee-list>
       : <jka-timesheet 
      
        api-base={this.apiBase} worker={ worker}
           >
       </jka-timesheet>
       }
  {/* ontimesheet-closed={(ev: CustomEvent) =>this.toList(ev.detail) } */}
     </Host>
   );
 }

}
