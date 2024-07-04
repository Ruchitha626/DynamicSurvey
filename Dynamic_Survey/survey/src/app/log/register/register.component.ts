import { HttpErrorResponse } from '@angular/common/http';

import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { SurveyService } from 'src/app/survey.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MessageService]
})
export class RegisterComponent {

  signIndetails:any;
  sign=false;
  log=true;
  Message:any
  constructor(private router:Router,
    private messageService:MessageService,
    private prservice:SurveyService,
    private fb:FormBuilder
  ){
    this.userForm = this.fb.group({
      adminName: ['', [Validators.required, Validators.minLength(4)]],
      adminEmail: ['', [Validators.required, Validators.email]],
      adminPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  userForm: FormGroup | any;
  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  adminName:any;
  adminPassword:any;
  ngOnInit(): void {
      
    this.show2();
    }
id:any;
  signIn() {
    if (this.userForm.valid) {
      this.sign=true;
      this.log=false;
      let data =
      {
        adminName: this.userForm.value.adminName,
        adminEmail: this.userForm.value.adminEmail,
        adminPassword: this.userForm.value.adminPassword
      };
    
      this.prservice.register(data).subscribe(
        (res: any) => {
          this.signIndetails = res;
         
          
         
            this.log=true;
            this.sign=false;
              // console.log(this.signIndetails, "sign");
              this.show();
              this.userForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.error('Error:', error);
        }
      );
    }
    else{
      this.show3();
    }
   
  }
  signn(){
    this.sign=true;
    this.log=false;

  }
  logs(){
    this.log=true;
    this.sign=false
  }
    
  logged:any;
  adminDetails:any;
  
  LogIn(adminNameInput: NgModel, adminPasswordInput: NgModel) {
    // Check if the fields are valid and touched before proceeding
    if (adminNameInput.valid && adminPasswordInput.valid && adminNameInput.touched && adminPasswordInput.touched) {
      this.prservice.registerDetails(this.adminName, this.adminPassword).subscribe((res: any) => {
        
            this.sign = false;
            this.log = true;
            this.logged = res;
            this.Message = res.Message;
            this.id = this.logged.data.adminId;
            
           
            localStorage.setItem("id", this.id);
            
            this.router.navigateByUrl('/get');
            
            this.show2();
        

       
    });
      console.log('Form is valid. Proceeding with LogIn.');
    } else {
      this.show1()
      console.log('Form is invalid or fields are not touched.');
    }
  }





  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'successfully regisered' });
  }
  show1() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'fill the details' });
  }
  show3() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'fill the details' });
  }
  show2(){
    // debugger
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'successfully login' });
  }
  show4(){
    this.messageService.add({severity:'error',summary:'error',detail:this.Message})
  }

}



