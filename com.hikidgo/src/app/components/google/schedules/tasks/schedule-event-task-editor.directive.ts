import { Directive, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Type } from '@angular/core';
import { ScheduleEventTaskEditorComponent } from './schedule-event-task-editor.component';
import { SpeakTaskEditorComponent } from './speak/speak-task-editor.component';
import { LaunchUrlTaskEditorComponent } from './launch-url/launch-url-task-editor.component';
import { LaunchCourseWorkTaskEditorComponent } from './launch-course-work/launch-course-work-task-editor.component';
import { LaunchCourseMeetTaskEditorComponent } from './launch-course-meet/launch-course-meet-task-editor.component';

@Directive({
  selector: '[schedule-event-task-editor-host]',
})
export class ScheduleEventTaskEditorDirective {
  private _componentRef: ComponentRef<ScheduleEventTaskEditorComponent>;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver) { }

  load(key: string): ScheduleEventTaskEditorComponent {

    var component: Type<ScheduleEventTaskEditorComponent> = null;

    switch (key) {
      case "speak":
        component = SpeakTaskEditorComponent;
        break;
      case "launchUrl":
        component = LaunchUrlTaskEditorComponent;
        break;
      case "launchCourseWork":
        component = LaunchCourseWorkTaskEditorComponent;
        break;
      case "launchCourseVideo":
        component = LaunchCourseMeetTaskEditorComponent;
        break;
    }

    if (component == null) {
      return;
    }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);

    this._viewContainerRef.clear();

    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = null;
    }

    this._componentRef = this._viewContainerRef.createComponent(componentFactory);
    return (<ScheduleEventTaskEditorComponent>this._componentRef.instance);
  }
}