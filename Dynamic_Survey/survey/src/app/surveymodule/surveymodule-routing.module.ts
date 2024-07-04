import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { GetsurveyComponent } from './getsurvey/getsurvey.component';
import { SurveyformComponent } from './surveyform/surveyform.component';
import { UpdatesurveyComponent } from './updatesurvey/updatesurvey.component';

const routes: Routes = [
  {
    path:'dash',
    component:DashboardComponent
  },
  {
    path:'add',
    component:AddsurveyComponent
  },
  {
    path:'get',
    component:GetsurveyComponent
  },
  {
    path:'survey/:sid',
    component:SurveyformComponent
  },
  {
    path:'update/:sid',
    component:UpdatesurveyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveymoduleRoutingModule { }
