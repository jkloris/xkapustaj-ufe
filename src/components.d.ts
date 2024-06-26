/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { iEmployee } from "./models/iEmployee";
export { iEmployee } from "./models/iEmployee";
export namespace Components {
    interface JkaApp {
        "ambulanceId": string;
        "apiBase": string;
        "basePath": string;
    }
    interface JkaEmployeeList {
        "ambulanceId": string;
        "apiBase": string;
    }
    interface JkaPersonalPage {
        "ambulanceId": string;
        "apiBase": string;
        "worker": string;
    }
    interface JkaTimesheet {
        "ambulanceId": string;
        "apiBase": string;
        "worker": string;
    }
}
export interface JkaEmployeeListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJkaEmployeeListElement;
}
export interface JkaPersonalPageCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJkaPersonalPageElement;
}
export interface JkaTimesheetCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJkaTimesheetElement;
}
declare global {
    interface HTMLJkaAppElement extends Components.JkaApp, HTMLStencilElement {
    }
    var HTMLJkaAppElement: {
        prototype: HTMLJkaAppElement;
        new (): HTMLJkaAppElement;
    };
    interface HTMLJkaEmployeeListElementEventMap {
        "employee-clicked": iEmployee;
    }
    interface HTMLJkaEmployeeListElement extends Components.JkaEmployeeList, HTMLStencilElement {
        addEventListener<K extends keyof HTMLJkaEmployeeListElementEventMap>(type: K, listener: (this: HTMLJkaEmployeeListElement, ev: JkaEmployeeListCustomEvent<HTMLJkaEmployeeListElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLJkaEmployeeListElementEventMap>(type: K, listener: (this: HTMLJkaEmployeeListElement, ev: JkaEmployeeListCustomEvent<HTMLJkaEmployeeListElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLJkaEmployeeListElement: {
        prototype: HTMLJkaEmployeeListElement;
        new (): HTMLJkaEmployeeListElement;
    };
    interface HTMLJkaPersonalPageElementEventMap {
        "personal-closed": string;
    }
    interface HTMLJkaPersonalPageElement extends Components.JkaPersonalPage, HTMLStencilElement {
        addEventListener<K extends keyof HTMLJkaPersonalPageElementEventMap>(type: K, listener: (this: HTMLJkaPersonalPageElement, ev: JkaPersonalPageCustomEvent<HTMLJkaPersonalPageElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLJkaPersonalPageElementEventMap>(type: K, listener: (this: HTMLJkaPersonalPageElement, ev: JkaPersonalPageCustomEvent<HTMLJkaPersonalPageElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLJkaPersonalPageElement: {
        prototype: HTMLJkaPersonalPageElement;
        new (): HTMLJkaPersonalPageElement;
    };
    interface HTMLJkaTimesheetElementEventMap {
        "timesheet-closed": string;
        "timesheet-personal": string;
    }
    interface HTMLJkaTimesheetElement extends Components.JkaTimesheet, HTMLStencilElement {
        addEventListener<K extends keyof HTMLJkaTimesheetElementEventMap>(type: K, listener: (this: HTMLJkaTimesheetElement, ev: JkaTimesheetCustomEvent<HTMLJkaTimesheetElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLJkaTimesheetElementEventMap>(type: K, listener: (this: HTMLJkaTimesheetElement, ev: JkaTimesheetCustomEvent<HTMLJkaTimesheetElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLJkaTimesheetElement: {
        prototype: HTMLJkaTimesheetElement;
        new (): HTMLJkaTimesheetElement;
    };
    interface HTMLElementTagNameMap {
        "jka-app": HTMLJkaAppElement;
        "jka-employee-list": HTMLJkaEmployeeListElement;
        "jka-personal-page": HTMLJkaPersonalPageElement;
        "jka-timesheet": HTMLJkaTimesheetElement;
    }
}
declare namespace LocalJSX {
    interface JkaApp {
        "ambulanceId"?: string;
        "apiBase"?: string;
        "basePath"?: string;
    }
    interface JkaEmployeeList {
        "ambulanceId"?: string;
        "apiBase"?: string;
        "onEmployee-clicked"?: (event: JkaEmployeeListCustomEvent<iEmployee>) => void;
    }
    interface JkaPersonalPage {
        "ambulanceId"?: string;
        "apiBase"?: string;
        "onPersonal-closed"?: (event: JkaPersonalPageCustomEvent<string>) => void;
        "worker"?: string;
    }
    interface JkaTimesheet {
        "ambulanceId"?: string;
        "apiBase"?: string;
        "onTimesheet-closed"?: (event: JkaTimesheetCustomEvent<string>) => void;
        "onTimesheet-personal"?: (event: JkaTimesheetCustomEvent<string>) => void;
        "worker"?: string;
    }
    interface IntrinsicElements {
        "jka-app": JkaApp;
        "jka-employee-list": JkaEmployeeList;
        "jka-personal-page": JkaPersonalPage;
        "jka-timesheet": JkaTimesheet;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "jka-app": LocalJSX.JkaApp & JSXBase.HTMLAttributes<HTMLJkaAppElement>;
            "jka-employee-list": LocalJSX.JkaEmployeeList & JSXBase.HTMLAttributes<HTMLJkaEmployeeListElement>;
            "jka-personal-page": LocalJSX.JkaPersonalPage & JSXBase.HTMLAttributes<HTMLJkaPersonalPageElement>;
            "jka-timesheet": LocalJSX.JkaTimesheet & JSXBase.HTMLAttributes<HTMLJkaTimesheetElement>;
        }
    }
}
