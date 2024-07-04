import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'app-getsurvey',
  templateUrl: './getsurvey.component.html',
  styleUrls: ['./getsurvey.component.css'],
  providers:[ConfirmationService,MessageService]
})
export class GetsurveyComponent implements OnInit {
  surveys: any[] = [];
  adminId: any;
  aid: any;
  currentSurveyId: number | null = null;
  visible=true
  constructor(
    private abc: SurveyService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.aid = localStorage.getItem("id");
    console.log(this.aid);
    this.getAllsurveys(this.aid);
  }
  showDialog(){
    
    this.visible=true;
      }
  message: any;

  getAllsurveys(id: any) {
    this.abc.getAllSurveyById(this.aid).subscribe((res: any) => {
      this.surveys = res.Data
      this.message = res.message;
      console.log(this.surveys);
    });
  }
  

  toggleMenu(surveyId: number) {
    if (this.currentSurveyId === surveyId) {
      this.currentSurveyId = null; // Close menu if clicking the same survey
    } else {
      this.currentSurveyId = surveyId;
    }
   
    
    // console.log(this.surveys, "surveys");
  }
  closeMenu() {
    this.currentSurveyId = null;
  }
  

  visible22 = false;

  cancel() {
    this.visible22 = false;
    this.showSuccessMessage();
  }

  delete1(id: any) {
    this.visible22 = true;
    this.adminId = id;
  }

  deleteSurvey(id: any) {
    this.abc.deleteSurvey(id).subscribe((res: any) => {
      this.getAllsurveys(this.adminId);
    });
    this.showSuccessMessage();
    this.visible22 = false;
  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Deleted successfully', key: 'br', life: 3000 });
  }
}
