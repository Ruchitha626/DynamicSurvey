import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './surveymodule/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { 
    path: '',
    component:DashboardComponent,
    loadChildren:()=>import('./surveymodule/surveymodule.module').then((m:any)=>m.SurveymoduleModule)
  },
  { 
    path: '',
    
    loadChildren:()=>import('./log/log.module').then((m:any)=>m.LogModule)
  },{
    path:'home',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
