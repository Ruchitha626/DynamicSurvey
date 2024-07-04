import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data:any
  menuVisible: boolean = false;
  loggeduser:any;
  image:any;
  
  constructor(){}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
 
  ngOnInit(): void {
    
  }

}
