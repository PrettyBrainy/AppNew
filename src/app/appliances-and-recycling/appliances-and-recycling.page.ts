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
  selector: 'app-appliances-and-recycling',
  templateUrl: './appliances-and-recycling.page.html',
  styleUrls: ['./appliances-and-recycling.page.scss'],
})
export class AppliancesAndRecyclingPage implements OnInit {
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
public completePledge1: boolean=true;
public completePledge2: boolean=true;
public completePledge3: boolean=true;
public completePledge4: boolean=true;
public completePledge5: boolean=true;
public createPledgeList: firebase.firestore.DocumentReference;
public pledgeListRef: firebase.firestore.CollectionReference;
public array: Array<any>;
private uid: String;
public complete: boolean;
public checkComplete: String;
public arPledges: firebase.firestore.DocumentReference;
public pledgeContent: string;
public pledgeCount: string;
public team: string;
public teamArPledgeCount: number;
public cityArPledgeCount: number;
public teamUsers: number;
public teamProgressBar: number;
public cityUserNumber: number;
public cityProgressBar: number;
public hideTeamProgressBar: boolean = true;
public pendingPledge1: boolean = true;
public pendingPledge2: boolean = true;
public pendingPledge3: boolean = true;
public pendingPledge4: boolean = true;
public pendingPledge5: boolean = true;
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
    .doc('appliancesAndRecycling')
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
    let getUserInfo = userRef.collection('approval').doc('appliancesAndRecycling').get().then((userSnap) => {
      var status = [userSnap.data().ar1, userSnap.data().ar2, userSnap.data().ar3, userSnap.data().ar4, userSnap.data().ar5];

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
        var teamArPledges = Number(teamSnap.data().arPledgeComplete);
        var teamTotalPledges = Number(teamSnap.data().totalPledgesComplete);

        var teamNewAr = difference + teamArPledges;
        var teamNewTotal = difference + teamTotalPledges;

        var teamNewTotals = {
          arPledgeComplete: `${teamNewAr}`,
          totalPledgesComplete: `${teamNewTotal}`
        }
        var userNewTotals = {
          teamPledgesCounted: `${count}`
        }
        let updateTeam = teamRef.update(teamNewTotals);
        let updateUser = userRef.collection('approval').doc('appliancesAndRecycling').update(userNewTotals);

      }

    })

  })
}
  

updateCityPledgeCount(){
  var cityRef = firebase.firestore().collection('cityOverall').doc('cityOverall');
  var userRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`);

  let getTeamInfo = cityRef.get().then((citySnap) =>{
    let getUserInfo = userRef.collection('approval').doc('appliancesAndRecycling').get().then((userSnap) => {
      var status = [userSnap.data().ar1, userSnap.data().ar2, userSnap.data().ar3, userSnap.data().ar4, userSnap.data().ar5];

      var count = 0;
      for(let n = 0; n<status.length; n++){
        if (status[n] == "approved"){
          count +=1;
        }
      }

      var included = Number(userSnap.data().cityPledgesCounted);

      var difference = count - included;
      if (difference > 0){
        var cityArPledges = Number(citySnap.data().arPledgeComplete);
        var cityTotalPledges = Number(citySnap.data().totalPledgesComplete);

        var cityNewAr = difference + cityArPledges;
        var cityNewTotal = difference + cityTotalPledges;

        var cityNewTotals = {
          edPledgeComplete: `${cityNewAr}`,
          totalPledgesComplete: `${cityNewTotal}`
        }

        var userNewTotals = {
          cityPledgesCounted: `${count}`
        }
        let updateTeam = cityRef.update(cityNewTotals);
        let updateUser = userRef.collection('approval').doc('appliancesAndRecycling').update(userNewTotals);

      }

    })

  })
}

startArModule(){
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
    ar1: " ",
    ar2: " ",
    ar3: " ",
    ar4: " ",
    ar5: " ",
  }

  let approval = {
    ar1: " ",
    ar2: " ",
    ar3: " ",
    ar4: " ",
    ar5: " ",
    teamPledgesCounted: 0,
    cityPledgesCounted: 0,
  }

  let points = {
    ar1: 0,
    ar2: 0,
    ar3: 0,
    ar4: 0,
    ar5: 0,
  }

  let pounds = {
    ar1: 0,
    ar2: 0,
    ar3: 0,
    ar4: 0,
    ar5: 0,
    teamPoundsCounted: 0,
    cityPoundsCounted: 0
  }
  
  let newUserTotals = {
    totalPledgesComplete: 0,
    arPledgeComplete: 0,
    points: 0,
    totalPoundsCarbon: 0
  }

  this.createPledgeList.collection("pledges").doc("appliancesAndRecycling").set(pledges);
  this.createPledgeList.collection("approval").doc("appliancesAndRecycling").set(approval);
  this.createPledgeList.collection("points").doc("appliancesAndRecycling").set(points);
  this.createPledgeList.collection("pounds").doc("appliancesAndRecycling").set(pounds);
  this.createPledgeList.update(newUserTotals);
  
}

getUserProgressBar(){
  const approvalRef = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('approval').doc('applianceAndRecycling'); 
  
  let checkApprovals = approvalRef.get().then(doc =>{
    if(doc.exists){
    let approvalArray = [doc.data().ar1, doc.data().ar2, doc.data().ar3, doc.data().ar4, doc.data().ar5];
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
      this.cityArPledgeCount = Number(docSnapshot.data().arPledgeComplete);
      this.cityUserNumber = count;
      var totalCityPledges = 5*Number(this.cityUserNumber);
      this.cityProgressBar = Number((Number(this.cityArPledgeCount)/totalCityPledges)*100);

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
        this.cityArPledgeCount = Number(docSnapshot.data().arPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);

        var totalCityPledges = 5*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityArPledgeCount)/totalCityPledges)*100);
      })

    } else{
      
      //__________________________________Get team info for team progress bar
      let teamCount = firebase.firestore().collection('teams').doc(`${this.team}`).get().then((docSnapshot)=>{
      this.teamArPledgeCount = Number(docSnapshot.data().arPledgeComplete);
      this.teamUsers = Number(docSnapshot.data().teamUsers);
      
      //__________________________________Get City info for city progress bar
      let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityArPledgeCount = Number(docSnapshot.data().arPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);
  
        var totalTeamPledges = 5 * Number(this.teamUsers);
        this.teamProgressBar = Number((Number(this.teamArPledgeCount)/totalTeamPledges)*100);
        console.log(this.teamProgressBar);
      
        var totalCityPledges = 5*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityArPledgeCount)/totalCityPledges)*100);
      })
    }) 

    }
  })
}  

checkForPledgeStatus(){
  let statusCheck1 = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('appliancesAndRecycling').get().then((docSnapshot)=>{
    var status1 = String(docSnapshot.data().ar1);
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
  .collection('approval').doc('appliancesAndRecycling').get().then((docSnapshot)=>{
    var status2 = String(docSnapshot.data().ar2);
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
  .collection('approval').doc('appliancesAndRecycling').get().then((docSnapshot)=>{
    var status3 = String(docSnapshot.data().ar3);
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
  .collection('approval').doc('appliancesAndRecycling').get().then((docSnapshot)=>{
    var status4 = String(docSnapshot.data().ar4);
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
  .collection('approval').doc('appliancesAndRecycling').get().then((docSnapshot)=>{
    var status5 = String(docSnapshot.data().ar5);
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

  let status = [status1, status2, status3, status4, status5];
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
    })
  })
}

}
