import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { CreateComponent } from './create/create.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { SurveymoduleModule } from './surveymodule/surveymodule.module';
import { LogModule } from './log/log.module';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    HomeComponent,
    CreateSurveyComponent
  ],
  imports: [
    BrowserModule,
    RatingModule,
    CheckboxModule,
    RadioButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    LogModule,
    HttpClientModule,
    SurveymoduleModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
