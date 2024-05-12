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


  renderComponent(worker: string, element: string, navigate: Function) {
    switch (element) {
      case "list":
        return (
          <jka-employee-list 
            onemployee-clicked={(ev: CustomEvent) => navigate('./timesheet/' + ev.detail.id)}
            api-base={this.apiBase}
            ambulance-id={this.ambulanceId}
          ></jka-employee-list>
        );
      case "timesheet":
        return (
          <jka-timesheet 
            ontimesheet-closed={() => navigate('./list')}
            ontimesheet-personal={(ev: CustomEvent) => navigate('./personal/'+ev.detail)}
            
            api-base={this.apiBase} 
            worker={worker}
            ambulance-id={this.ambulanceId}
          ></jka-timesheet>
        );
        case "personal":
          return (
            <jka-personal-page 
              onpersonal-closed={(ev: CustomEvent) => navigate('./timesheet/'+ev.detail)}
              api-base={this.apiBase} 
              worker={worker}
              ambulance-id={this.ambulanceId}
            ></jka-personal-page>
          );
      default:
        return null; // Or render a default component if needed
    }
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
   }else if ( this.relativePath.startsWith("personal/"))
   {
     element = "personal";
     this.header = "Personal Overview"
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
      
        {this.renderComponent(worker, element, navigate)}
    </div>
     </Host>
   );
 }

}
