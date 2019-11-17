import { EventService } from './../services/pledges/pledge-service.service';
import { AuthService } from '../services/user/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../services/user/profile.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {
  x:number;
public hideButton: boolean=false;
public hideText: boolean=false;
public hidePledge1: boolean=true;
public hidePledge2: boolean=true;
public hidePledge3: boolean=true;
public hidePledge4: boolean=true;
public hidePledge5: boolean=true;
public hidePledges: boolean=true;
public showPledge1: boolean=true;
public showPledge2: boolean=true;
public showPledge3: boolean=true;
public showPledge4: boolean=true;
public showPledge5: boolean=true;
public createPledgeList: firebase.firestore.DocumentReference;
public pledgeListRef: firebase.firestore.CollectionReference;
public array: Array<any>;
  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private eventService: EventService) { this.x=45 }

  ngOnInit() {
    
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
      uid = user.uid; 
    }
    
    this.array = []
    this.eventService.checkModuleStart().then( pledgeListSnapshot => {
      pledgeListSnapshot.forEach(snap => {
        this.array.push({})
      if(this.array.length>0){
        this.hideButton=true;
        this.hideText=true;
        this.hidePledges=false;
        this.hidePledge1=false;
        this.hidePledge2=false;
        this.hidePledge3=false;
        this.hidePledge4=false;
        this.hidePledge5=false;
      }

  })})}
  



startEdModule(){
  this.hideButton=true;
  this.hideText=true;
  this.hidePledges=false;
  this.hidePledge1=false;
  this.hidePledge2=false;
  this.hidePledge3=false;
  this.hidePledge4=false;
  this.hidePledge5=false;

  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
    uid = user.uid; 
  }
  
  this.createPledgeList = firebase.firestore().collection('userProfile').doc(`${uid}`);
  let pledges = {
    ed1: " ",
    ed2: " ",
    ed3: " ",
    ed4: " ",
    ed5: " ",
  }
  this.createPledgeList.collection("pledges").doc("education").set(pledges);
  
}

countPledges(){


}


}
