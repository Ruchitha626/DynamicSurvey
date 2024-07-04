import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SurveyService {

 private surveyUrl1="http://localhost:8081/survey";
private registerUrl="http://localhost:8081/register";


private idSource = new BehaviorSubject<number | null>(null);
  id$ = this.idSource.asObservable();


  constructor(private http:HttpClient) { }
 
  saveSurvey(survey: any): Observable<any> {
    return this.http.post<any>(`${this.surveyUrl1}/insertSurvey`, survey);
  }
  
  addSurveyByRegister(survey:any): Observable<any>{
    return this.http.post<any>(`${this.surveyUrl1}/addSurvey`,survey)
  }

  register(data:any){
    return this.http.post<any>(`${this.registerUrl}/admin`,data);
  }

  registerDetails(adminName:any,adminPassword:any){
    return this.http.get(`${this.registerUrl}/getUser/${adminName}/${adminPassword}`)
  }

  // registergetbyId(id:any){
  //   return this.http.get(`${this.registerUrl}/getbyId/${id}`)
  // }

  getAllSurveyById(id:any){
    return this.http.get(`${this.surveyUrl1}/getSurvey/${id}`)
  }

  deleteSurvey(id:any){
    return this.http.delete(`${this.surveyUrl1}/delete/${id}`)
  }

  setId(id: number) {
    this.idSource.next(id);
  }

  getSurveyById(id:any) : Observable<any> {
   return this.http.get<any>(`${this.surveyUrl1}/getById/${id}`)
  }

  insertAnswers(data:any){
    return this.http.post<any>(`${this.surveyUrl1}/insertAnswers`,data)
  }

  updateSurvey(id:any,data:any){
    return this.http.put<any>(`${this.surveyUrl1}/updateSurvey/${id}`,data)
  }

  emailSent(data:any){
    return this.http.post<any>(`${this.surveyUrl1}/submit`,data) 
  }

}
