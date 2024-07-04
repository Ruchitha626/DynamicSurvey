import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { RegisterComponent } from './register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LogRoutingModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class LogModule { }
