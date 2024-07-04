import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'app-updatesurvey',
  templateUrl: './updatesurvey.component.html',
  styleUrls: ['./updatesurvey.component.css'],
  providers: [MessageService]
})
export class UpdatesurveyComponent implements OnInit {

  surveyForm: FormGroup|any;
  allData: any;
  questionTypeOptions: SelectItem[] = [
    { label: 'Email', value: 'Email' },
    { label: 'Text', value: 'Text' },
    { label: 'Numeric', value: 'Numeric' },
    { label: 'Dropdown', value: 'Dropdown' },
    { label: 'Radio', value: 'Radio' },
    { label: 'Checkbox', value: 'Checkbox' },
    { label: 'Rating', value: 'rating' },
    { label: 'PDF', value: 'pdf' }
  ];
  stars = 5;
  sid: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private messageService: MessageService
  ) {
    this.surveyForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('sid');
      if (id) {
        this.initializeForm(id);
      }
    });
  }

  initializeForm(id: string): void {
    this.surveyService.getSurveyById(id).subscribe(
      (res: any) => {
        this.allData = res.data;
        this.populateQuestions();
      },
      (error) => {
        console.error('Error fetching survey data', error);
      }
    );
  }

  populateQuestions(): void {
    const questionFormArray = this.surveyForm.get('questions') as FormArray;
    this.allData.questions.forEach((question: any) => {
      const questionGroup = this.fb.group({
        qid: [question.qid],
        questionName: [question.questionName, Validators.required],
        questionType: this.fb.group({
          typeName: [question.questionType.typeName, Validators.required],
        }),
        options: this.fb.array(
          question.options.map((option: any) => this.fb.group({
            oid: [option.oid],
            optionName: [option.optionName, Validators.required]
          }))
        )
      });

      // if (question.questionType.typeName === 'rating' || question.questionType.typeName === 'pdf') {
      //   questionGroup.addControl('answer', this.fb.control('', Validators.required));
      // }

      questionFormArray.push(questionGroup);
    });
  }

  handleQuestionTypeChange(questionIndex: number, selectedType: string): void {
    const questionFormArray = this.surveyForm.get('questions') as FormArray;
    const questionFormGroup = questionFormArray.at(questionIndex) as FormGroup|any;
    questionFormGroup.get('questionType.typeName').setValue(selectedType);

    if (!this.isOptionQuestion(selectedType)) {
      questionFormGroup.setControl('options', this.fb.array([]));
    }

    if (selectedType === 'rating' || selectedType === 'pdf') {
      if (!questionFormGroup.get('answer')) {
        questionFormGroup.addControl('answer', this.fb.control('', Validators.required));
      }
    } else {
      questionFormGroup.removeControl('answer');
    }
  }

  isOptionQuestion(questionType: string): boolean {
    return ['dropdown', 'radio', 'checkbox'].includes(questionType.toLowerCase());
  }

  addOption(questionIndex: number): void {
    const questionFormArray = this.surveyForm.get('questions') as FormArray;
    const optionsFormArray = questionFormArray.at(questionIndex).get('options') as FormArray;
    optionsFormArray.push(this.fb.group({
      oid: [Math.floor(Math.random() * 90) + 10],
      optionName: ['', Validators.required]
    }));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const questionFormArray = this.surveyForm.get('questions') as FormArray;
    const optionsFormArray = questionFormArray.at(questionIndex).get('options') as FormArray;
    optionsFormArray.removeAt(optionIndex);
  }

  handleSubmit(): void {
    const payload = {
      questions: this.surveyForm.value.questions,
      registration: this.allData.registration,
      name: this.allData.name
    };

    this.sid = this.allData.sid;

    this.surveyService.updateSurvey(this.sid, payload).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Survey updated successfully' });
        this.router.navigateByUrl('/get');
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update survey' });
      }
    );
  }
}
