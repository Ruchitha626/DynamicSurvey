import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [MessageService]
})
export class CreateComponent implements OnInit {
  surveyName:any;
  questionsForm: FormGroup;
  visible=false;
  qa=false;
  showDialog(){
this.visible=true
  }
  save() {
    this.visible = false;
    this.qa = true;
    
  }
  onCancel() {
    this.visible = false;
    this.questionsForm.reset();
  }
  answerTypes = [
    { label: 'Email', value: 'email' },
    { label: 'Text', value: 'text' },
    { label: 'Numeric', value: 'numeric' },
    { label: 'Dropdown', value: 'dropdown' },
    { label: 'Radio', value: 'radio' },
    { label: 'Checkbox', value: 'checkbox' }
  ];
  showOptionsInput: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService,private service:SurveyService
  ) {
    this.questionsForm = this.fb.group({
      surveyName:[],
      questions: this.fb.array([]),
      newQuestion: this.fb.group({
        question: ['', Validators.required],
        answerType: ['', Validators.required],
        options: this.fb.array([]),
        currentOption: '',
        
      }),
      answer:['']
    });
  }
  

  ngOnInit(): void {}

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
    this.newQuestion.patchValue({ answerType: event.value });
    this.showOptionsInput = ['dropdown', 'radio', 'checkbox'].includes(event.value);
    this.options.clear();
  }

  addOption() {
    const currentOption = this.newQuestion.get('currentOption')?.value.trim();
    if (currentOption !== '') {
      this.options.push(this.fb.control(currentOption));
      this.newQuestion.patchValue({ currentOption: '' });
    }
  }
  handleGenerateNew() {
    if (this.newQuestion.invalid || (['dropdown', 'radio', 'checkbox'].includes(this.newQuestion.value.answerType) && this.options.length === 0)) {
      this.messageService.add({ severity: 'error', summary: 'Incomplete Question', detail: 'Please fill out all fields before generating a new question.' });
      return;
    }
    let initialAnswer = '';
    if (this.newQuestion.value.answerType === 'text' || this.newQuestion.value.answerType === 'email' || this.newQuestion.value.answerType === 'numeric') {
      initialAnswer = '';
    } else {
      initialAnswer = '';
    }
  
   
    const newQ = {
      question: this.newQuestion.value.question,
      type: this.newQuestion.value.answerType,
      options: this.options.value,
      answer: initialAnswer
    };
  
    const newQFormGroup = this.fb.group({
      question: [newQ.question, Validators.required],
      type: [newQ.type],
      options: this.fb.array(newQ.options.map((option:any) => this.fb.control(option))),
      answer: [newQ.answer]
    });
  
    this.questions.push(newQFormGroup);
      this.newQuestion.reset();
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
      switch (q.type) {
        case 'text':
          questionType = { type: 'Text' };
          break;
        case 'email':
          questionType = { type: 'Email' };
          break;
        case 'numeric':
          questionType = { type: 'Numeric' };
          break;
        case 'dropdown':
          questionType = { type: 'Dropdown' };
          break;
        case 'radio':
          questionType = { type: 'Radio' };
          break;
        case 'checkbox':
          questionType = { type: 'Checkbox' };
          break;
        default:
          questionType = { type: 'Unknown' };
          break;
      }

      const options = q.options.map((option: any) => ({ optionname: option }));

      return {
        questionName: q.question,
        questiontype: questionType,
        options: options
      };
    });

    const payload = {
      name: this.questionsForm.get('surveyName')?.value,
      questions: formattedQuestions
    };

    console.log(payload);

    this.service.saveSurvey(payload) 
    .subscribe( 
      (res: any) => { 
        console.log(res); 
        this.messageService.add({ severity: 'success', summary: 'Questions Saved', detail: 'Questions and answers have been saved successfully.' }); 
      }, 
      (err: any) => { 
        console.error(err); 
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save questions and answers.' }); 
      } 
    );
  }
}
