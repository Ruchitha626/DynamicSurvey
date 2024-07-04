import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'app-surveyform',
  templateUrl: './surveyform.component.html',
  styleUrls: ['./surveyform.component.css']
})
export class SurveyformComponent implements OnInit {
  surveyForm: FormGroup|any;
  allData: any;
  sid :any;
  public array:any[]=[];
  dropdownOptionsCache: { [key: string]: any[] } = {};
  selectedAnswers: any[]=[];

  constructor(private fb: FormBuilder, private surveyService: SurveyService,private route: ActivatedRoute,private router:Router) {
    this.surveyForm = this.fb.group({
      questions: this.fb.array([]),
      UserEmail:['',[Validators.required, Validators.email]],
      
      answer: '',
    });
  }
  onUpload(event: any, question: AbstractControl) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      question.get('answer')?.setValue(reader.result);
    };
    reader.readAsDataURL(file);
    console.log(file.name,"file");
    
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sid = params.get('sid');
    });
    this.getSurvey(this.sid);
   this.array=this.selectedAnswers;
   
   
  }
name:any;
  getSurvey(id: any) {
    this.surveyService.getSurveyById(id).subscribe(
      (res: any) => {
        this.allData = res.data;
        this.name=this.allData.name;
        // console.log(this.name,"name");
        
        // console.log(this.allData); 
        this.initializeForm();
      },
      (error: any) => {
        console.error('Error fetching survey:', error);
      }
    );
  }

  initializeForm() {
    if (!this.allData || !this.allData.questions) {
      console.error('No questions data available');
      return;
    }

    const questionsArray = this.surveyForm.get('questions') as FormArray;
    this.allData.questions.forEach((question: any) => {
      questionsArray.push(this.createQuestionGroup(question));
    });
  }

  createQuestionGroup(question: any): FormGroup {
    const group: FormGroup = this.fb.group({
      qid: [question.qid],
      questionName: [question.questionName],
      questionType: [question.questionType.typeName],
      answer: '',
    });
  
    if (question.options && question.options.length > 0) {
      group.addControl('options', this.fb.array(
        question.options.map((option: any) => this.fb.control(option.optionName))
      ));
    }
  
    return group;
  }
  

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

 

  getDropdownOptions(question: AbstractControl) {
    const questionKey = question.get('questionName')?.value;
    if (!this.dropdownOptionsCache[questionKey]) {
      const optionsArray = this.getOptions(question);
      this.dropdownOptionsCache[questionKey] = optionsArray.controls.map(opt => ({ label: opt.value, value: opt.value }));
    }
    
    return this.dropdownOptionsCache[questionKey];
  }
  getOptions(question: AbstractControl): FormArray {
    
    return question.get('options') as FormArray;
  }

  getCheckboxValue(option: any) {
    const index = this.selectedAnswers.indexOf(option.value);
    // this.selectedAnswers=this.surveyForm.controls['selectedAnswers'] ?[].concat(...this.surveyForm.controls['selectedAnswers'].value):[];
    // let fuelType = this.FilterListForm.controls['fuelType'].value ?[].concat (...this.FilterListForm.controls['fuelType'].value) : [];

    if (index === -1) {
     
      this.selectedAnswers.push(option.value); 

      // console.log('ghhgj:::',this.selectedAnswers);
    }else {
      this.selectedAnswers.splice(index, 1); // Remove the option if it was already selected
    }
   
    // this.array=this.selectedAnswers.flat();
    // console.log(this.array,"array");
    
  }


  onSubmit() {
    // console.log(this.surveyForm.value.questions,"submit");
    let payloads:any =[];
    let payload1={
      email: this.surveyForm.get('UserEmail')?.value
    }
    // console.log(payload1,"1111");
    
    this.surveyForm.value.questions.map((item:any)=>{
      if(item.questionType == "Checkbox"){
        const flat = item.answer.flat();
        item.key = [...flat]
        item.answer = [...item.key]
      }
      payloads.push(item)
      
    })
    // console.log('debugggg',payloads);
    
    

    const payload = payloads.map((question: any) => {
      const answer = question.answer; // Assuming you have answer variable properly set from question.answer
      return {
          questionType: question.questionType,
          questionName: question.questionName,
          qId: question.qid, 
  
          ...(question.questionType === 'Checkbox'
              ? { answer: answer }
              : { answerJson: answer }),
  
          surveyId: this.sid,
          email: this.surveyForm.get('UserEmail')?.value
      };
  });
    this.surveyService.insertAnswers(payload).subscribe(
      (res: any) => {
        this.surveyService.emailSent(payload1).subscribe((res1:any)=>{
          // console.log(res1,"rejdnbi");
          
        })
        // console.log(res, "res");
        this.router.navigateByUrl('/home')
      },
      (error: any) => {
        console.error('Error inserting answers:', error);
      }
    );
  }
}
