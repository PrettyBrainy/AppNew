  
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
public pledgeContent: string;
public pledgeCount: string;
public team: string;
public teamEdPledgeCount: number;
public cityEdPledgeCount: number;
public teamUsers: number;
public teamProgressBar: number;
public cityUserNumber: number;
public cityProgressBar: number;
public hideTeamProgressBar: boolean;
public pendingPledge1: boolean;
public pendingPledge2: boolean;
public pendingPledge3: boolean;
public pendingPledge4: boolean;
public pendingPledge5: boolean;
public pending: boolean=true;
public hasAgeRange: boolean = true;
public noAgeRange: boolean = true;

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


this.checkForAgeRange();

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
        this.getUserProgressBar();
        this.checkForPledgeStatus();
      } else{
        this.hideButton=false;
        this.hideText=false;
        this.hidePledges=true;
      }
})
this.doesUserHaveTeam();
}

checkForAgeRange(){
  let getUserAge = firebase.firestore().collection('userProfile').doc(`${this.uid}`).get().then(user =>{
    console.log(user.data().birthDate);
    if(user.data().birthDate != undefined){
      this.hasAgeRange = false;
      this.noAgeRange = true;
    }else{
      this.hasAgeRange = true;
      this.noAgeRange = false;
    }
  })

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
    teamPledgesCounted: 0,
    cityPledgesCounted: 0
  }

  let approval = {
    ed1: " ",
    ed2: " ",
    ed3: " ",
    ed4: " ",
    ed5: " ",
  }

  let points = {
    ed1: 0,
    ed2: 0,
    ed3: 0,
    ed4: 0,
    ed5: 0,
  }

  let pounds = {
    ed1: 0,
    ed2: 0,
    ed3: 0,
    ed4: 0,
    ed5: 0,
    teamPoundsCounted: 0,
    cityPoundsCounted: 0
  }
  
  let newUserTotals = {
    totalPledgesComplete: 0,
    edPledgeComplete: 0,
    points: 0,
    totalPoundsCarbon: 0
  }

  this.createPledgeList.collection("pledges").doc("education").set(pledges);
  this.createPledgeList.collection("approval").doc("education").set(approval);
  this.createPledgeList.collection("points").doc("education").set(points);
  this.createPledgeList.collection("pounds").doc("education").set(pounds);
  this.createPledgeList.update(newUserTotals);
  
}

getUserProgressBar(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('education'); 
  
  let checkApprovals = approvalRef.get().then(doc =>{
    if(doc.exists){
    let approvalArray = [doc.data().ed1, doc.data().ed2, doc.data().ed3, doc.data().ed4, doc.data().ed5];
    let count = 0;
    let approvedArray = [];
    for(let n = 0; n<approvalArray.length; n++){
      if (approvalArray[n] == "approved"){
        approvedArray.push(false);
        count +=1 ;
      } 
      var countPercent = (count/5)*100;
      this.pledgeCount = String(countPercent);
    }
  }
  })
}

doesUserHaveTeam(){
  const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  let getTeam = userRef.get().then(user => {
    if (user.data().team != undefined){
      this.hideTeamProgressBar = false;
      this.team = user.data().team
      this.teamAndCityProgressBarTotals();
      
    } else{
      this.hideTeamProgressBar = true;
      this.cityProgressBarTotals();
    }
  })
}


cityProgressBarTotals(){
  //__________________________________Get City info for city progress bar
  let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
    this.cityEdPledgeCount = Number(docSnapshot.data().edPledgeComplete);
    this.cityUserNumber = Number(docSnapshot.data().totalUsers);

    var totalCityPledges = 5*Number(this.cityUserNumber);
    this.cityProgressBar = Number((Number(this.cityEdPledgeCount)/totalCityPledges)*100);
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

checkForPledgeStatus(){
  let statusCheck1 = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('education').get().then((docSnapshot)=>{
    var status1 = String(docSnapshot.data().ed1);
    console.log(status1);
    
    if(status1 == ' '){
      this.incompletePledge1=false;
      this.pendingPledge1=true;
      this.completePledge1=true;
      console.log("no data - 1");
    } 
    else if(status1 == 'pending'){
      this.incompletePledge1=true;
      this.pendingPledge1=false;
      this.completePledge1=true;
      console.log("pending - 1");
    }else {
      this.incompletePledge1=true;
      this.pendingPledge1=true;
      this.completePledge1=false;
      console.log("has data - 1");
    } 

let statusCheck2 = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('education').get().then((docSnapshot)=>{
    var status2 = String(docSnapshot.data().ed2);
    console.log(status2); 
    
    if(status2 == ' '){
      this.incompletePledge2=false;
      this.completePledge2=true;
      this.pendingPledge2=true;
      console.log("no data - 2");
    }else if (status2 == 'pending'){
      this.incompletePledge2=true;
      this.completePledge2=true;
      this.pendingPledge2=false;
      console.log("pending - 2");
    }else {
      this.incompletePledge2=true;
      this.completePledge2=false;
      this.pendingPledge2=true;
      console.log("has data - 2");
    } 

let statusCheck3 = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('education').get().then((docSnapshot)=>{
    var status3 = String(docSnapshot.data().ed3);
    console.log(status3);
    
    if(status3 == ' '){
      this.incompletePledge3=false;
      this.completePledge3=true;
      this.pendingPledge3=true;
      console.log("no data - 3");
    }else if(status3 == 'pending'){
      this.incompletePledge3=true;
      this.completePledge3=true;
      this.pendingPledge3=false;
      console.log("pending - 3");
    }else {
      this.incompletePledge3=true;
      this.completePledge3=false;
      this.pendingPledge3=true;
      console.log("has data - 3");
    } 

let statusCheck4 = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('education').get().then((docSnapshot)=>{
    var status4 = String(docSnapshot.data().ed4);
    console.log(status4);
    
    if(status4 == ' '){
      this.incompletePledge4=false;
      this.completePledge4=true;
      this.pendingPledge4=true;
      console.log("no data - 4");
    }else if(status4 == 'pending'){
      this.incompletePledge4=true;
      this.completePledge4=true;
      this.pendingPledge4=false;
      console.log("pending - 4");
    }else {
      this.incompletePledge4=true;
      this.completePledge4=false;
      this.pendingPledge4=true;
      console.log("has data - 4");
    } 

let statusCheck5 = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('education').get().then((docSnapshot)=>{
    var status5 = String(docSnapshot.data().ed5);
    console.log(status5);
    
    if(status5 == ' '){
      this.incompletePledge5=false;
      this.completePledge5=true;
      this.pendingPledge5=true;
      console.log("no data - 5");
    }else if (status5 == 'pending'){
      this.incompletePledge5=true;
      this.completePledge5=true;
      this.pendingPledge5=false;
      console.log("pending - 5");
    }else {
      this.incompletePledge5=true;
      this.completePledge5=false;
      this.pendingPledge5=true;
      console.log("has data - 5");
    } 
  
 if (status1 == ' ' && status2 == ' ' && status3 == ' ' && status4 == ' ' && status5 == ' '){
    this.completeWord = true;
    this.incomplete = false;
    this.pending = true;
 }

 else if (status1 == 'pending' && status2 == 'pending' && status3 == 'pending' && status4 == 'pending' && status5 == 'pending'){
    this.completeWord = true;
    this.incomplete = true;
    this.pending = false;
 }

 else if (status1 != ' ' && status2 != ' ' && status3 != ' ' && status4 != ' ' && status5 != ' '){
    this.completeWord = false;
    this.incomplete = true;
    this.pending = true;
 }
 
 else if (status1 != 'pending' && status2 != 'pending' && status3 != 'pending' && status4 != 'pending' && status5 != 'pending'){
  this.completeWord = false;
  this.incomplete = true;
  this.pending = true;
}

else if (status1 == 'pending' || ' ' && status2 == 'pending' || ' ' && status3 == 'pending' || ' ' && status4 == 'pending' || ' ' && status5 == 'pending' || ' '){
  this.completeWord = true;
  this.incomplete = false;
  this.pending = false;
}

else if (status1 == 'approved' || ' ' && status1 != 'pending' && status2 == 'approved' || ' ' && status2 != 'pending' && status3 == 'approved' || ' ' && status3 != 'pending' && status4 == 'approved' || ' ' && status4 != 'pending' && status5 == 'approved' || ' ' && status5 != 'pending'){
  this.completeWord = false;
  this.incomplete = false;
  this.pending = true;
}

else if (status1 == 'approved' || 'pending' && status1 != ' ' && status2 == 'approved' || 'pending' && status2 != ' ' && status3 == 'approved' || 'pending'&& status3 != ' ' && status4 == 'approved' || 'pending' && status4 != ' ' && status5 == 'approved' || 'pending' && status5 != ' '){
  this.completeWord = false;
  this.incomplete = true;
  this.pending = false;
}

 /*else if (status1 == "approved" || 'pending' || ' ' && status2 == "approved" || 'pending' || ' ' && status3 == "approved" || 'pending' || ' ' && status4 == "approved" || 'pending' || ' ' && status5 == "approved" || 'pending' || ' '){
   this.completeWord = false;
   this.incomplete = false;
   this.pending = false; 
 } */

  else {
    this.completeWord = false;
    this.incomplete = false;
    this.pending = false;
  }
 
            
          })
        })
      })
    })
  })
}

}
