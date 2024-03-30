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
  @State() private worker: iEmployee
  @State() private element: string = 'list'

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
   this.worker = employee
   this.element = 'timesheet'
   
 }

 toList(event:string){
  console.log(event)
  this.element = 'list'
 }

 render() {
  //  let element = "list"
   if ( this.relativePath.startsWith("worker/"))
   {
     this.element = "timesheet";
     this.worker = null//this.relativePath.split("/")[1]
   }
 
  //  const navigate = (path:string) => {
  //    const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
  //    window.navigation.navigate(absolute)
  //  }
 
   return (
     <Host>
     
       { this.element === "list"
       ? <jka-employee-list 
       onemployee-clicked={(ev: CustomEvent) => this.toTimesheet(ev.detail) }
       api-base={this.apiBase}
           > 
         </jka-employee-list>
       : <jka-timesheet 
       ontimesheet-closed={(ev: CustomEvent) =>this.toList(ev.detail) }
        api-base={this.apiBase} worker={this.worker}
           >
       </jka-timesheet>
       }
 
     </Host>
   );
 }

}
