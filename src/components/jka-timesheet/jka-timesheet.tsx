import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'jka-timesheet',
  styleUrl: 'jka-timesheet.css',
  shadow: true,
})
export class JkaTimesheet {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
