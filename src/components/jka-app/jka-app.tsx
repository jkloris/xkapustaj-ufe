import { Component, Host, Prop, State, h } from '@stencil/core';

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

  private header:string = ""

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





 render() {
   let element = "list"
   let worker = ""
   this.header = "Hospital Emplyee List"
   if ( this.relativePath.startsWith("timesheet/"))
   {
     element = "timesheet";
     this.header = "Timesheet"
     worker = this.relativePath.split("/")[1]
   }
 
   const navigate = (path:string) => {
     const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
     console.log(absolute)
     window.navigation.navigate(absolute)
   }
 
   return (
     <Host>
      <div class="container">
        <h1 style={{color: "#3e8baa"}}>{this.header}</h1>
      
       { element === "list"
       ? <jka-employee-list 
        onemployee-clicked={(ev: CustomEvent) =>navigate('./timesheet/'+ ev.detail.id) }
        api-base={this.apiBase}
           > 
         </jka-employee-list>
       : <jka-timesheet 
          ontimesheet-closed={() =>navigate('./list') }
          api-base={this.apiBase} worker={ worker}
           >
       </jka-timesheet>
       }
    </div>
     </Host>
   );
 }

}
