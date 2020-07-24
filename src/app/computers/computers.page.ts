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
  selector: 'app-computers',
  templateUrl: './computers.page.html',
  styleUrls: ['./computers.page.scss'],
})
export class ComputersPage implements OnInit {
public hideButton: boolean=false;
public hideText: boolean=false;
public incompletePledge1: boolean=true;
public incompletePledge2: boolean=true;
public incompletePledge3: boolean=true;
public incomplete: boolean=false;
public completeWord: boolean=true;
public hidePledges: boolean=true;
public completePledge1: boolean=true;
public completePledge2: boolean=true;
public completePledge3: boolean=true;
public createPledgeList: firebase.firestore.DocumentReference;
public pledgeListRef: firebase.firestore.CollectionReference;
public array: Array<any>;
private uid: String;
public complete: boolean;
public checkComplete: String;
public cPledges: firebase.firestore.DocumentReference;
public pledgeContent: string;
public pledgeCount: string;
public team: string;
public teamCPledgeCount: number;
public cityCPledgeCount: number;
public teamUsers: number;
public teamProgressBar: number;
public cityUserNumber: number;
public cityProgressBar: number;
public hideTeamProgressBar: boolean = true;
public pendingPledge1: boolean = true;
public pendingPledge2: boolean = true;
public pendingPledge3: boolean = true;
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


this.updateCityPledgeCount();
this.checkForAgeRange();
this.doesUserHaveTeam();
const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
let getTeam = userRef.get().then(user => {
  if (user.data().team != "undefined"){
    this.hideTeamProgressBar = false;
    this.team = user.data().team
    this.teamAndCityProgressBarTotals();
    console.log(this.team);
    this.updateTeamPledgeCount(this.team);
    
  } else{
    this.hideTeamProgressBar = true;
    this.cityProgressBarTotals();
    console.log(this.team);
  }
})
//______________________________Check if mod started using exist funcion
let modStarted = firebase.firestore()
    .collection('userProfile')
    .doc(`${uid}`)
    .collection('pledges')
    .doc('computers')
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

updateTeamPledgeCount(team: string){

  var teamRef = firebase.firestore().collection('teams').doc(`${team}`);
  var userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);

  let getTeamInfo = teamRef.get().then((teamSnap) =>{
    let getUserInfo = userRef.collection('approval').doc('computers').get().then((userSnap) => {
      var status = [userSnap.data().c1, userSnap.data().c2, userSnap.data().c3];

      console.log(status);

      var count = 0;
      for(let n = 0; n<status.length; n++){
        if (status[n] == "approved"){
          count +=1;
        }
      }

      console.log(count);

      var included = Number(userSnap.data().teamPledgesCounted);

      var difference = count - included;

      console.log(difference);

      if (difference > 0){
        var teamCPledges = Number(teamSnap.data().CPledgeComplete);
        var teamTotalPledges = Number(teamSnap.data().totalPledgesComplete);

        var teamNewC = difference + teamCPledges;
        var teamNewTotal = difference + teamTotalPledges;

        var teamNewTotals = {
          CPledgeComplete: `${teamNewC}`,
          totalPledgesComplete: `${teamNewTotal}`
        }
        var userNewTotals = {
          teamPledgesCounted: `${count}`
        }
        let updateTeam = teamRef.update(teamNewTotals);
        let updateUser = userRef.collection('approval').doc('computers').update(userNewTotals);

      }

    })

  })
}
  

updateCityPledgeCount(){
  var cityRef = firebase.firestore().collection('cityOverall').doc('cityOverall');
  var userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);

  let getTeamInfo = cityRef.get().then((citySnap) =>{
    let getUserInfo = userRef.collection('approval').doc('computers').get().then((userSnap) => {
      var status = [userSnap.data().c1, userSnap.data().c2, userSnap.data().c3];

      var count = 0;
      for(let n = 0; n<status.length; n++){
        if (status[n] == "approved"){
          count +=1;
        }
      }

      var included = Number(userSnap.data().cityPledgesCounted);

      var difference = count - included;
      if (difference > 0){
        var cityCPledges = Number(citySnap.data().CPledgeComplete);
        var cityTotalPledges = Number(citySnap.data().totalPledgesComplete);

        var cityNewC = difference + cityCPledges;
        var cityNewTotal = difference + cityTotalPledges;

        var cityNewTotals = {
          CPledgeComplete: `${cityNewC}`,
          totalPledgesComplete: `${cityNewTotal}`
        }

        var userNewTotals = {
          cityPledgesCounted: `${count}`
        }
        let updateTeam = cityRef.update(cityNewTotals);
        let updateUser = userRef.collection('approval').doc('computers').update(userNewTotals);

      }

    })

  })
}

startCModule(){
  this.hideButton=true;
  this.hideText=true;
  this.hidePledges=false;
  this.incompletePledge1=false;
  this.incompletePledge2=false;
  this.incompletePledge3=false;
  this.completePledge1=true;
  this.completePledge2=true;
  this.completePledge3=true;
  
  this.createPledgeList = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  let pledges = {
    c1: " ",
    c2: " ",
    c3: " ",
  }

  let approval = {
    c1: " ",
    c2: " ",
    c3: " ",
    teamPledgesCounted: 0,
    cityPledgesCounted: 0,
  }

  let points = {
    c1: 0,
    c2: 0,
    c3: 0,
  }

  let pounds = {
    c1: 0,
    c2: 0,
    c3: 0,
    teamPoundsCounted: 0,
    cityPoundsCounted: 0
  }
  
  let newUserTotals = {
    totalPledgesComplete: 0,
    CPledgeComplete: 0,
    points: 0,
    totalPoundsCarbon: 0
  }

  this.createPledgeList.collection("pledges").doc("computers").set(pledges);
  this.createPledgeList.collection("approval").doc("computers").set(approval);
  this.createPledgeList.collection("points").doc("computers").set(points);
  this.createPledgeList.collection("pounds").doc("computers").set(pounds);
  this.createPledgeList.update(newUserTotals);
  
}

getUserProgressBar(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('computers'); 
  
  let checkApprovals = approvalRef.get().then(doc =>{
    if(doc.exists){
    let approvalArray = [doc.data().c1, doc.data().c2, doc.data().c3];
    let count = 0;
    let approvedArray = [];
    for(let n = 0; n<approvalArray.length; n++){
      if (approvalArray[n] == "approved"){
        approvedArray.push(false);
        count +=1 ;
      } 
      var countPercent = (count/3)*100;
      this.pledgeCount = String(countPercent);
    }
  }
  })
}

doesUserHaveTeam(){
  const userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);
  let getTeam = userRef.get().then(user => {
    if (user.data().team != "undefined"){
      this.hideTeamProgressBar = false;
      this.team = user.data().team
      this.teamAndCityProgressBarTotals();
      console.log(this.team);
      
    } else{
      this.hideTeamProgressBar = true;
      this.cityProgressBarTotals();
      console.log(this.team);
    }
  })
}


 

cityProgressBarTotals(){

  //__________________________________Get City info for city progress bar
  var count = 0;
  let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
    let cityUserCount = firebase.firestore().collection('userProfile').get().then(snap =>{
      snap.forEach(doc =>{
        count +=1;
      })
      console.log(count);
      this.cityCPledgeCount = Number(docSnapshot.data().CPledgeComplete);
      this.cityUserNumber = count;
      var totalCityPledges = 3*Number(this.cityUserNumber);
      this.cityProgressBar = Number((Number(this.cityCPledgeCount)/totalCityPledges)*100);

    })
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
        this.cityCPledgeCount = Number(docSnapshot.data().CPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);

        var totalCityPledges = 3*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityCPledgeCount)/totalCityPledges)*100);
      })

    } else{
      
      //__________________________________Get team info for team progress bar
      let teamCount = firebase.firestore().collection('teams').doc(`${this.team}`).get().then((docSnapshot)=>{
      this.teamCPledgeCount = Number(docSnapshot.data().CPledgeComplete);
      this.teamUsers = Number(docSnapshot.data().teamUsers);
      
      //__________________________________Get City info for city progress bar
      let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityCPledgeCount = Number(docSnapshot.data().CPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);
  
        var totalTeamPledges = 3 * Number(this.teamUsers);
        this.teamProgressBar = Number((Number(this.teamCPledgeCount)/totalTeamPledges)*100);
        console.log(this.teamProgressBar);
      
        var totalCityPledges = 3 * Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityCPledgeCount)/totalCityPledges)*100);
      })
    }) 

    }
  })
}  

checkForPledgeStatus(){
  let statusCheck1 = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('computers').get().then((docSnapshot)=>{
    var status1 = String(docSnapshot.data().c1);
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
  .collection('approval').doc('computers').get().then((docSnapshot)=>{
    var status2 = String(docSnapshot.data().c2);
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
  .collection('approval').doc('computers').get().then((docSnapshot)=>{
    var status3 = String(docSnapshot.data().c3);
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

  let status = [status1, status2, status3];
  let approved = 0;
  let pending = 0; 
  let incomplete = 0;
  for(let n = 0; n<status.length; n++){
    if (status[n] == "approved"){
      approved +=1;
      console.log(approved);
    }
     if (status[n] == "pending"){
      pending +=1;
    }
     if (status[n]== " "){
      incomplete +=1;
    }

  console.log(incomplete);
  if (incomplete > 0){
    this.incomplete = false;
  }
  if(pending > 0){
    this.pending = false;
  }
  if(approved > 0){
    this.completeWord = false;
  }

}       
          })
        })
      })
    }
  }

