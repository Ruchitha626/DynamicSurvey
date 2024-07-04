import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'app-addsurvey',
  templateUrl: './addsurvey.component.html',
  styleUrls: ['./addsurvey.component.css'],
  providers: [MessageService]
})
export class AddsurveyComponent {
adminId:number=0;
  surveyName:any;
  questionsForm: FormGroup|any;
  visible=true;
  qa=false;
  stars=5;
  shows=true;
  showDialog(){
    
this.visible=true;
  }
  save() {
    const surveyNameControl = this.questionsForm.get('surveyName');

    if (surveyNameControl.invalid) {
      this.markFormGroupTouched(this.questionsForm);
      return;
    }
    this.visible = false;
    this.qa = true;
    this.shows = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Survey Name Created' });
  }
  private markFormGroupTouched(formGroup: FormGroup|any) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      }
    });
  }
 
  onCancel() {
    this.messageService.add({ severity: 'error', summary: 'cancel', detail: 'Survey Canceled' });

    this.shows=true
    this.qa=false;
    this.visible = false;
    this.questionsForm.reset();
    this.router.navigateByUrl('/get')
  }
  questionType = [
    { label: 'Email', value: 'email' },
    { label: 'Text', value: 'text' },
    { label: 'Numeric', value: 'numeric' },
    { label: 'Dropdown', value: 'dropdown' },
    { label: 'Radio', value: 'radio' },
    { label: 'Checkbox', value: 'checkbox' },
    { label: 'rating', value: 'rating' },
    { label: 'pdf', value: 'pdf' }
  ];
  showOptionsInput: boolean = false;

  id: number | undefined;


  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private service:SurveyService,
    private router :Router
  ) {
    this.questionsForm = this.fb.group({
      surveyName:['',Validators.required],
      answer: [null],
      adminId:[null,Validators.required],
      questions: this.fb.array([]),
      newQuestion: this.fb.group({
        question: ['', Validators.required],
        questionType: ['', Validators.required],
        options: this.fb.array([]),
        currentOption: '',
        
      })
      
    });
  }
  
  ngOnInit(){
    
    const storedId = localStorage.getItem("id");
    if (storedId) {
      this.adminId = +storedId; // Convert to number
    }
    // console.log('Admin ID:', this.adminId); 
   }

  get questions() {
    return this.questionsForm.get('questions') as FormArray;
  }

  get newQuestion() {
    return this.questionsForm.get('newQuestion') as FormGroup;
  }

  get options() {
    return this.newQuestion.get('options') as FormArray;
  }

  onAnswerTypeChange(event: any) {
    this.showOptionsInput = ['dropdown', 'radio', 'checkbox'].includes(event.value);
    this.options.clear();
    this.newQuestion.patchValue({ questionType: event.value });

  }

  addOption() {
    const currentOption = this.newQuestion.get('currentOption')?.value.trim();
    if (currentOption !== '') {
      this.options.push(this.fb.control(currentOption));
      this.newQuestion.patchValue({ currentOption: '' });
    }
  }
  removeOption(index: number) {
    this.options.removeAt(index);
  }
  
  onUpload(event: any): void {
    const files = event.target.files;
    const answerControl = this.questionsForm.get('newQuestion.answer');

    if (answerControl) {
      answerControl.setValue(files && files.length ? files[0] : null);
    }
  }
  handleGenerateNew() {
    const newQuestionGroup = this.newQuestion;
    
    // Mark all controls as touched to trigger validation messages
    newQuestionGroup.markAllAsTouched();
  
    if (newQuestionGroup.invalid || (['dropdown', 'radio', 'checkbox'].includes(newQuestionGroup.value.questionType) && this.options.length === 0)) {
      this.messageService.add({ severity: 'error', summary: 'Incomplete Question', detail: 'Please fill out all fields before generating a new question.' });
      return;
    }
  
    let initialAnswer = '';
    switch (newQuestionGroup.value.questionType) {
      case 'text':
      case 'email':
      case 'numeric':
        initialAnswer = '';
        
        
        break;
      case 'rating':
        initialAnswer = '';
        break;
        case 'pdf':
        initialAnswer = '';
        break;
      default:
        initialAnswer = '';
        break;
    }
    // console.log("dshhgburewdsyhjruwdsygh");
  
    const newQ = {
      question: newQuestionGroup.value.question,
      typeName: newQuestionGroup.value.questionType,
      options: this.options.value,
      answer: null
    };
  
    const newQFormGroup = this.fb.group({
      question: [newQ.question, Validators.required],
      typeName: [newQ.typeName],
      options: this.fb.array(newQ.options.map((option: any) => this.fb.control(option))),
      answer: [newQ.answer]
    });
  
    this.questions.push(newQFormGroup);
    newQuestionGroup.reset();
    this.options.clear();
    this.showOptionsInput = false;
  }
  
  

  handleEndQuestions() {
    if (this.questions.length === 0) {
      this.messageService.add({ severity: 'error', summary: 'No Questions', detail: 'Please create at least one question before ending.' });
      return;
    }

    const formattedQuestions = this.questions.value.map((q: any) => {
      let questionType;
      switch (q.typeName) {
        case 'text':
          questionType = { typeName: 'Text' };
          break;
        case 'email':
          questionType = { typeName: 'Email' };
          break;
        case 'numeric':
          questionType = { typeName: 'Numeric' };
          break;
        case 'dropdown':
          questionType = { typeName: 'Dropdown' };
          break;
        case 'radio':
          questionType = { typeName: 'Radio' };
          break;
        case 'checkbox':
          questionType = { typeName: 'Checkbox' };
          break;
          case 'rating':
          questionType = { typeName: 'rating' };
          break;
          case 'pdf':
          questionType = { typeName: 'pdf' };
          break;
        default:
          questionType = { typeName: 'Unknown' };
          break;
      }
// console.log(questionType,"type");

      const options = q.options.map((option: any) => ({ optionName: option }));

      return {
        questionName: q.question,
        questionType: questionType,
        options: options
      };
    });

    const payload = {
      adminId:this.adminId,
      survey:{
        name: this.questionsForm.get('surveyName')?.value,
        questions: formattedQuestions
      }
      
    };
// console.log(this.questions,"questions");

    // console.log(payload);
    this.messageService.add({ severity: 'success', summary: 'Questions Saved', detail: 'Questions and answers have been saved successfully.' }); 

    this.service.addSurveyByRegister(payload) 
    .subscribe( 
      (res: any) => { 
        // console.log(res); 
        this.questionsForm.reset();
        this.router.navigateByUrl("/get")
      }, 
      (err: any) => { 
        // console.error(err); 
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save questions and answers.' }); 
      } 
    );
  }
}
