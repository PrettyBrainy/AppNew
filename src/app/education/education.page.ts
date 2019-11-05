import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {
  x:number;

  constructor() { this.x=45 }

  ngOnInit() {
  }
  
public hideButton: boolean=false;
public hideText: boolean=false;
public hidePledge1: boolean=true;
public hidePledge2: boolean=true;
public hidePledge3: boolean=true;
public hidePledge4: boolean=true;
public hidePledge5: boolean=true;
public hidePledges: boolean=true;


startEdModule(){
  this.hideButton=true;
  this.hideText=true;
  this.hidePledges=false;
  this.hidePledge1=false;
  this.hidePledge2=false;
  this.hidePledge3=false;
  this.hidePledge4=false;
  this.hidePledge5=false;

}


}
