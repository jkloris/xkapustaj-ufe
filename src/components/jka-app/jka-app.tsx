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
   let worker = ''
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
       { element === "list"
       ? <jka-jka-employee-list  api-base={this.apiBase}
           oneditor-closed={ () => console.log('navigate("./list")')} >
         </jka-jka-employee-list>
       : <jka-timesheet  api-base={this.apiBase} worker={worker}
           onentry-clicked={ (ev: CustomEvent<string>)=> console.log('navigate("./worker/" + ev.detail)', ev) } >
       </jka-timesheet>
       }
 
     </Host>
   );
 }

}
