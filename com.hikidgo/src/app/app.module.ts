import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common'; 

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';

import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { TitleService } from './services/title/title.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppSettingsService } from './services/app-settings/app-settings.service';
import { UserStateFactory } from './services/authentication/user-state.factory';
import { DragDropDirective } from './directives/drag-drop-directive';
import { MomentPipe } from './pipes/moment-pipe';
import { TimePipe } from './pipes/time-pipe';
import { BaseComponent } from './base.component';
import { GoogleComponent } from './google.component';
import { GoogleSchedulesComponent } from './components/google/schedules/google-schedules.component';
import { GoogleWeeklyScheduleComponent } from './components/google/schedules/google-weekly-schedule.component';
import { GoogleDailyScheduleComponent } from './components/google/schedules/google-daily-schedule.component';
import { ScheduleEventPreviewComponent } from './components/google/schedules/schedule-event-preview.component';
import { ScheduleEventEditorComponent } from './components/google/schedules/schedule-event-editor.component';
import { ScheduleEventTaskEditorDirective } from './components/google/schedules/tasks/schedule-event-task-editor.directive';
import { ScheduleEventTaskLoaderComponent } from './components/google/schedules/tasks/schedule-event-task-loader.component';
import { SpeakTaskEditorComponent } from './components/google/schedules/tasks/speak/speak-task-editor.component';
import { LaunchUrlTaskEditorComponent } from './components/google/schedules/tasks/launch-url/launch-url-task-editor.component';
import { LaunchCourseWorkTaskEditorComponent } from './components/google/schedules/tasks/launch-course-work/launch-course-work-task-editor.component';
import { LaunchCourseMeetTaskEditorComponent } from './components/google/schedules/tasks/launch-course-meet/launch-course-meet-task-editor.component';

import { GoogleAuthComponent } from './components/google/auth/google-auth.component';
import { GoogleAuthCallbackComponent } from './components/google/auth/google-auth-callback.component';

import { GoogleCoursesService } from './services/google/courses/courses.service';
import { GoogleCourseWorkService } from 'src/app/services/google/course-work/course-work.service';
import { GoogleCourseWorkTopicsService } from 'src/app/services/google/course-work-topics/course-work-topics.service';
import { GoogleSchedulesService } from './services/google/schedules/schedules.service';
import { SchedulesService } from './services/schedules/schedules.service';
import { GoogleRunService } from './services/google/run/run.service';
import { GoogleRunTaskFactory } from './services/google/run/tasks/run-task.factory';
import { GoogleSpeakTaskRunnerService } from './services/google/run/tasks/speak/speak-task-runner.service';
import { GoogleLaunchUrlTaskRunnerService } from './services/google/run/tasks/launch-url/launch-url-task-runner.service';
import { GoogleLaunchCourseWorkTaskRunnerService } from './services/google/run/tasks/launch-course-work/launch-course-work-task-runner.service';


// Multilingual
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
  
import esUS from '@angular/common/locales/es-US';  
import { PaginatorI18n } from './extensions/paginator-i18n';
import { GoogleGuardedRouteService } from './services/google/authorization/google-guarded-route.service';

registerLocaleData(esUS, 'es-US');

export class DynamicLocaleId extends String {
  locale: string;

  toString() {
    return this.locale;
  }
}

@NgModule({
  declarations: [
    BaseComponent,
    MomentPipe,
    TimePipe,
    AppComponent,
    HomeComponent,
    GoogleComponent,
    GoogleAuthComponent,
    GoogleAuthCallbackComponent,
    GoogleSchedulesComponent,
    GoogleWeeklyScheduleComponent,
    GoogleDailyScheduleComponent,
    ScheduleEventPreviewComponent,
    ScheduleEventEditorComponent,
    ScheduleEventTaskLoaderComponent,
    ScheduleEventTaskEditorDirective,
    SpeakTaskEditorComponent,
    LaunchUrlTaskEditorComponent,
    LaunchCourseWorkTaskEditorComponent,
    LaunchCourseMeetTaskEditorComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule,
    MatMenuModule, MatDatepickerModule, MatIconModule, MatCheckboxModule,
    MatCardModule, MatProgressSpinnerModule, MatFormFieldModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatSlideToggleModule, MatSelectModule,
    MatRadioModule, MatButtonToggleModule, MatSliderModule,
    MatMomentDateModule, MatExpansionModule, MatProgressBarModule,
    MatTabsModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateHttpLoader,
          deps: [HttpClient]
      }
  })
  ],
  exports: [
    MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule,
    MatMenuModule, MatDatepickerModule, MatIconModule, MatCheckboxModule,
    MatCardModule, MatProgressSpinnerModule, MatFormFieldModule,
    MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatSlideToggleModule, MatSelectModule,
    MatRadioModule, MatButtonToggleModule, MatSliderModule,
    MatMomentDateModule, MatExpansionModule, MatProgressBarModule,
    MatSnackBarModule, MatDialogModule, MatAutocompleteModule
  ],
  providers: [ 
    Title, 
    Meta,
    TitleService,
    AppSettingsService,
    TranslateService,
    UserStateFactory,
    GoogleCoursesService,
    GoogleCourseWorkService,
    GoogleCourseWorkTopicsService,
    GoogleGuardedRouteService,
    GoogleSchedulesService,
    GoogleRunService,
    GoogleRunTaskFactory,
    GoogleSpeakTaskRunnerService,
    GoogleLaunchUrlTaskRunnerService,
    GoogleLaunchCourseWorkTaskRunnerService,
    SchedulesService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService,multi: true},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 7000}},
    { provide: LOCALE_ID, useClass: DynamicLocaleId },
    { provide: MatPaginatorIntl, useClass: PaginatorI18n, deps: [TranslateService], multi:false }
  ],
  entryComponents:[
    ScheduleEventEditorComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(translate: TranslateService){

    var languages = ['en-US', 'es-US'];
    var chosenLang = translate.getBrowserLang();

    if(chosenLang == 'en')
      chosenLang = 'en-US';
    else if(chosenLang == 'es')
      chosenLang = 'es-US';

    var lang = sessionStorage.getItem('language');
    var idx = languages.indexOf(lang);
    if(idx > -1){
      chosenLang = languages[idx];
    }

    translate.addLangs(languages);
    translate.setDefaultLang('en-US');
    translate.use(chosenLang);
    
  }
  
}