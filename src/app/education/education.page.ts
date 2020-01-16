  
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
public hideButton: boolean=false;
public hideText: boolean=false;
public incompletePledge1: boolean=true;
public incompletePledge2: boolean=true;
public incompletePledge3: boolean=true;
public incompletePledge4: boolean=true;
public incompletePledge5: boolean=true;
public incomplete: boolean=false;
public completeWord: boolean=true;
public hidePledges: boolean=true;
public completePledge1: boolean=false;
public completePledge2: boolean=false;
public completePledge3: boolean=false;
public completePledge4: boolean=false;
public completePledge5: boolean=false;
public createPledgeList: firebase.firestore.DocumentReference;
public pledgeListRef: firebase.firestore.CollectionReference;
public array: Array<any>;
private uid: String;
public complete: boolean;
public checkComplete: String;
public edPledges: firebase.firestore.DocumentReference;
public pledgeContent: String;
public pledgeCount: String;
public team: String;
public teamEdPledgeCount: Number;
public cityEdPledgeCount: Number;
public teamUsers: Number;
public teamProgressBar: Number;
public cityUserNumber: Number;
public cityProgressBar: Number;
public hideTeamProgressBar: Boolean;
  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private eventService: EventService) { }

  ngOnInit() {
    //____________________Import userId
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
      uid = user.uid; 
      this.uid = user.uid;
    }


//______________________________Check if mod started using exist funcion
let modStarted = firebase.firestore()
    .collection('userProfile')
    .doc(`${uid}`)
    .collection('pledges')
    .doc('education')
    .get().then((docSnapshot)=>{
      if(docSnapshot.exists){
        this.hideButton=true;
        this.hideText=true;
        this.hidePledges=false;
      } else{
        this.hideButton=false;
        this.hideText=false;
        this.hidePledges=true;
      }
})

var count = 0;
//__________________________________________ Show/Hide for all ed pledges
let data1 = firebase.firestore().collection('userProfile').doc(`${uid}`).collection('pledges').doc('education').get()
.then((docSnapshot) =>{
  var ed1Verf = String(docSnapshot.data().ed1); 
  console.log(ed1Verf)
  if (ed1Verf == ' '){
    this.incompletePledge1=false;
    this.completePledge1=true;
    console.log("no data - 1");
   
  }
  else{
    this.incompletePledge1=true;
    this.completePledge1=false;
    console.log("has data - 1");
    count += 1;
  }

  var ed2Verf = String(docSnapshot.data().ed2); 
  console.log(ed2Verf)
  if (ed2Verf == ' '){
    this.incompletePledge2=false;
    this.completePledge2=true;
    console.log("no data - 2");
  }
  else{
    this.incompletePledge2=true;
    this.completePledge2=false;
    console.log("has data - 2");
    count += 1;
  }

  var ed3Verf = String(docSnapshot.data().ed3); 
  console.log(ed3Verf)
  if (ed3Verf == ' '){
    this.incompletePledge3=false;
    this.completePledge3=true;
    console.log("no data - 3");
  }
  else{
    this.incompletePledge3=true;
    this.completePledge3=false;
    console.log("has data - 3");
    count += 1;
  }

  var ed4Verf = String(docSnapshot.data().ed4); 
  console.log(ed4Verf)
  if (ed4Verf == ' '){
    this.incompletePledge4=false;
    this.completePledge4=true;
    console.log("no data - 4");
  }
  else{
    this.incompletePledge4=true;
    this.completePledge4=false;
    console.log("has data - 4");
    count += 1;
  }

  var ed5Verf = String(docSnapshot.data().ed5); 
  console.log(ed5Verf)
  if (ed5Verf == ' '){
    this.incompletePledge5=false;
    this.completePledge5=true;
    console.log("no data - 5");
  }
  else{
    this.incompletePledge5=true;
    this.completePledge5=false;
    console.log("has data - 5");
    count += 1;
  }
var countPercent = (count/5)*100;
this.pledgeCount = String(countPercent);
console.log(this.pledgeCount);
  
 if (ed1Verf == ' ' && ed2Verf == ' ' && ed3Verf == ' ' && ed4Verf == ' ' && ed5Verf == ' '){
    this.completeWord = true;
    this.incomplete = false;
 }

 else if (ed1Verf != ' ' && ed2Verf != ' ' && ed3Verf != ' ' && ed4Verf != ' ' && ed5Verf != ' '){
    this.completeWord = false;
    this.incomplete = true;
 }
 
 else{
   this.completeWord = false;
   this.incomplete = false;
 } 
}) 

this.teamAndCityProgressBarTotals();

}
  

startEdModule(){
  this.hideButton=true;
  this.hideText=true;
  this.hidePledges=false;
  this.incompletePledge1=false;
  this.incompletePledge2=false;
  this.incompletePledge3=false;
  this.incompletePledge4=false;
  this.incompletePledge5=false;
  this.completePledge1=true;
  this.completePledge2=true;
  this.completePledge3=true;
  this.completePledge4=true;
  this.completePledge5=true;
  
  this.createPledgeList = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  let pledges = {
    ed1: " ",
    ed2: " ",
    ed3: " ",
    ed4: " ",
    ed5: " ",
  }

  let approval = {
    ed1: " ",
    ed2: " ",
    ed3: " ",
    ed4: " ",
    ed5: " ",
  }

  let points = {
    ed1: " ",
    ed2: " ",
    ed3: " ",
    ed4: " ",
    ed5: " ",
  }
  let newUserTotals = {
    totalPledgesComplete: 0,
    totalEdPledgeComplete: 0
  }
  this.createPledgeList.collection("pledges").doc("education").set(pledges);
  this.createPledgeList.collection("approval").doc("education").set(approval);
  this.createPledgeList.collection("points").doc("education").set(points);
  this.createPledgeList.update(newUserTotals);
  
}


checkForCompletion(pledge: String){
this.checkComplete = String(this.retreiveContent(pledge));
    console.log(this.checkComplete)
    if (this.checkComplete == ' '){
      this.complete=true;
      console.log("no data - 5");
      return this.complete;
    }
    else{
      this.complete = false;
      console.log("has data - 5");
      return this.complete;
    }
}


retreiveContent(pledge:String){
let bumblebee = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pledges').doc('education').get().then((docSnapshot)=>{
  switch (pledge) {
  case 'ed1':
    this.pledgeContent = String(docSnapshot.data().ed1);
    return this.pledgeContent;
  case 'ed2':
    this.pledgeContent = String(docSnapshot.data().ed2);
    return this.pledgeContent;
  case 'ed3':
    this.pledgeContent = String(docSnapshot.data().ed3);
    return this.pledgeContent;
  case 'ed4':
    this.pledgeContent = String(docSnapshot.data().ed4);
    return this.pledgeContent;
  case 'ed5':
    this.pledgeContent = String(docSnapshot.data().ed5);
    return this.pledgeContent;
  default:
    break;
}
})
}

teamAndCityProgressBarTotals(){
  let teamPledgeCount = firebase.firestore().collection('userProfile').doc(`${this.uid}`).get().then((docSnapshot) =>{
    this.team = String(docSnapshot.data().team);
    
//______________________________________Check fot team, show team progress bar if user has team

    if (this.team == 'undefined'){
      this.hideTeamProgressBar = true;

      //__________________________________Get City info for city progress bar
      let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityEdPledgeCount = Number(docSnapshot.data().edPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);

        var totalCityPledges = 5*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityEdPledgeCount)/totalCityPledges)*100);
      })

    } else{
      
      //__________________________________Get team info for team progress bar
      let teamCount = firebase.firestore().collection('teams').doc(`${this.team}`).get().then((docSnapshot)=>{
      this.teamEdPledgeCount = Number(docSnapshot.data().edPledgeComplete);
      this.teamUsers = Number(docSnapshot.data().teamUsers);
      
      //__________________________________Get City info for city progress bar
      let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityEdPledgeCount = Number(docSnapshot.data().edPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);
  
        var totalTeamPledges = 5 * Number(this.teamUsers);
        this.teamProgressBar = Number((Number(this.teamEdPledgeCount)/totalTeamPledges)*100);
        console.log(this.teamProgressBar);
      
        var totalCityPledges = 5*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityEdPledgeCount)/totalCityPledges)*100);
      })
    }) 

    }
  })
}  
}
