import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SurveymoduleRoutingModule } from './surveymodule-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { GetsurveyComponent } from './getsurvey/getsurvey.component';
import { SurveyformComponent } from './surveyform/surveyform.component';
import { UpdatesurveyComponent } from './updatesurvey/updatesurvey.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AddsurveyComponent,
    GetsurveyComponent,
    SurveyformComponent,
    UpdatesurveyComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    InputTextModule,
    RatingModule,
    CheckboxModule,
    ConfirmDialogModule,
    FileUploadModule,
    DropdownModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    RadioButtonModule,
    SurveymoduleRoutingModule,
    ToolbarModule,
    SidebarModule,
    ButtonModule
  ],
  exports:[
    DashboardComponent,
    AddsurveyComponent,
    UpdatesurveyComponent
  ]
})
export class SurveymoduleModule { }
