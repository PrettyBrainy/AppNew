
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
public teamsArray: Array<String>;
public arrayToSort: Array<any>;
public team1: String;
public team2 = '';
public team3 = '';
public team4 = '';
public team5 = '';
public team6 = '';
public team7 = '';
public team8 = '';
public team9 = '';
public team10 = '';
public poundsOrder: Array<Number>;
public pledgesOrder: Array<Number>;
public removeDuplicates: Array<Number>;
public pounds1: Number;
public pounds2: Number;
public pounds3: Number;
public pounds4: Number;
public pounds5: Number;
public pounds6: Number;
public pounds7: Number;
public pounds8: Number;
public pounds9: Number;
public pounds10: Number;
public pledges1: Number;
public pledges2: Number;
public pledges3: Number;
public pledges4: Number;
public pledges5: Number;
public pledges6: Number;
public pledges7: Number;
public pledges8: Number;
public pledges9: Number;
public pledges10: Number;
public lbs: boolean = true;
public pledges: boolean = false;

  constructor() { }

  ngOnInit() {
  this.orderByPounds();

    
  }


orderByPounds(){
  this.lbs = true;
  this.pledges = false;
  const teamRef = firebase.firestore().collection('teams');
  var teamsArray = [];
  var poundsArray = [];
  teamRef.orderBy("TotalPoundsCarbon", 'asc').limit(10);
  teamRef
  .get()
  .then((snapshot) => {
      snapshot.forEach(function(doc) {
        teamsArray.push(String(doc.id), Number(doc.data().totalPoundsCarbon));
        poundsArray.push(Number(doc.data().totalPoundsCarbon));
      });
      console.log(teamsArray);
      
      let sortThisArray = [];
      for(let n = 0; n<teamsArray.length; n+=2){
        sortThisArray.push([teamsArray[n], teamsArray[n+1]])
      }
      console.log(sortThisArray);
      var poundsOrder = poundsArray.sort((a,b) => b-a);
      this.poundsOrder = poundsOrder;
      console.log(poundsOrder);
    
      var removeDuplicates = orderedTeamNames.filter((a, b) => orderedTeamNames.indexOf(a) === b);
            this.removeDuplicates = removeDuplicates;
            console.log("remove duplicates", removeDuplicates);

      let orderedTeamNames = [];
      for( let n = 0; n<sortThisArray.length; n++){
        for (let i = 0; i<sortThisArray.length; i++)
          if (sortThisArray[i][1] == poundsOrder[n]){
            var removeDuplicates = orderedTeamNames.filter((a, b) => orderedTeamNames.indexOf(a) === b);
            this.removeDuplicates = removeDuplicates;
            console.log("remove duplicates", removeDuplicates);

            removeDuplicates.push(sortThisArray[i][0]);
            //orderedTeamNames.push(sortThisArray[i][0]);
          }
      }

     /* if (sortThisArray.length<10){
        var diff = 10-sortThisArray.length;
        var diff2 = 10-orderedTeamNames.length;
        for (let n = 0; n<=diff; n++){
          sortThisArray.push(["Your Team Here!", 0])
          orderedTeamNames.push("Your Team Here!");
        }
      } */
    
    if (sortThisArray.length<10){
        var diff = 10-sortThisArray.length;
        var diff2 = 10-removeDuplicates.length;
        for (let n = 0; n<=diff; n++){
          sortThisArray.push(["Your Team Here!", 0])
          removeDuplicates.push("Your Team Here!");
        }
      }

     /* if (orderedTeamNames.length<10){
        var diff = 10-orderedTeamNames.length;
        for (let n = 0; n<=diff; n++){
          orderedTeamNames.push("Your Team Here!");
        }
      } */
    
    if (removeDuplicates.length<10){
        var diff = 10-removeDuplicates.length;
        for (let n = 0; n<=diff; n++){
          removeDuplicates.push("Your Team Here!");
        }
      }
    
     /* console.log(orderedTeamNames);
      let that = this;
      this.team1 = orderedTeamNames[0];
      this.team2 = orderedTeamNames[1];
      this.team3 = orderedTeamNames[2];
      this.team4 = orderedTeamNames[3];
      this.team5 = orderedTeamNames[4];
      this.team6 = orderedTeamNames[5];
      this.team7 = orderedTeamNames[6];
      this.team8 = orderedTeamNames[7];
      this.team9 = orderedTeamNames[8];
      this.team10 = orderedTeamNames[9]; */
    
      console.log(removeDuplicates);
      let that = this;
      this.team1 = removeDuplicates[0];
      this.team2 = removeDuplicates[1];
      this.team3 = removeDuplicates[2];
      this.team4 = removeDuplicates[3];
      this.team5 = removeDuplicates[4];
      this.team6 = removeDuplicates[5];
      this.team7 = removeDuplicates[6];
      this.team8 = removeDuplicates[7];
      this.team9 = removeDuplicates[8];
      this.team10 = removeDuplicates[9];


      this.assignPoundsVariables();
      this.retrieveCompletedPledges();

  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
//console.log(teamsArray);
}

orderByPledges(){
  this.lbs = false;
  this.pledges = true;
  const teamRef = firebase.firestore().collection('teams');
  var teamsArray = [];
  var pledgesArray = [];
  teamRef.orderBy("TotalPoundsCarbon", 'asc').limit(10);
  teamRef
  .get()
  .then((snapshot) => {
      snapshot.forEach(function(doc) {
        teamsArray.push(String(doc.id), Number(doc.data().totalPledgesComplete));
        pledgesArray.push(Number(doc.data().totalPledgesComplete));
      });
      console.log(teamsArray);
      
      let sortThisArray = [];
      for(let n = 0; n<teamsArray.length; n+=2){
        sortThisArray.push([teamsArray[n], teamsArray[n+1]])
      }
      console.log(sortThisArray);
      var pledgesOrder = pledgesArray.sort((a,b) => b-a);
      this.pledgesOrder = pledgesOrder;
      console.log(pledgesOrder);

      let orderedTeamNames = [];
      for( let n = 0; n<sortThisArray.length; n++){
        for (let i = 0; i<sortThisArray.length; i++)
          if (sortThisArray[i][1] == pledgesOrder[n]){
            orderedTeamNames.push(sortThisArray[i][0]);
          }
      }

      if (sortThisArray.length<10){
        var diff = 10-sortThisArray.length;
        var diff2 = 10-orderedTeamNames.length;
        for (let n = 0; n<=diff; n++){
          sortThisArray.push(["Your Team Here!", 0])
          orderedTeamNames.push("Your Team Here!");
        }
      }

      if (orderedTeamNames.length<10){
        var diff = 10-orderedTeamNames.length;
        for (let n = 0; n<=diff; n++){
          orderedTeamNames.push("Your Team Here!");
        }
      }
      console.log(orderedTeamNames);
      this.team1 = orderedTeamNames[0];
      this.team2 = orderedTeamNames[1];
      this.team3 = orderedTeamNames[2];
      this.team4 = orderedTeamNames[3];
      this.team5 = orderedTeamNames[4];
      this.team6 = orderedTeamNames[5];
      this.team7 = orderedTeamNames[6];
      this.team8 = orderedTeamNames[7];
      this.team9 = orderedTeamNames[8];
      this.team10 = orderedTeamNames[9];

      this.assignPledgesVariables();
      this.retrieveTotalPounds();

  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

}

assignPledgesVariables(){
  if (this.pledgesOrder.length <10){
    let diff = 10 - this.pledgesOrder.length;
    for (let n = 0; n<diff; n++){
      this.pledgesOrder.push(0);
    }
  }
this.pledges1 = this.pledgesOrder[0]
this.pledges2 = this.pledgesOrder[1]
this.pledges3 = this.pledgesOrder[2]
this.pledges4 = this.pledgesOrder[3]
this.pledges5 = this.pledgesOrder[4]
this.pledges6 = this.pledgesOrder[5]
this.pledges7 = this.pledgesOrder[6]
this.pledges8 = this.pledgesOrder[7]
this.pledges9 = this.pledgesOrder[8]
this.pledges10 = this.pledgesOrder[9]
}

retrieveTotalPounds(){
  let teamsListRef = firebase.firestore().collection('teams')

  teamsListRef.doc(`${this.team1}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds1 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds1 = 0;
    }
  })
  teamsListRef.doc(`${this.team2}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds2 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds2 = 0;
    }
  })
  teamsListRef.doc(`${this.team3}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds3 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds3 = 0;
    }
  })
  teamsListRef.doc(`${this.team4}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds4 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds4 = 0;
    }
  })
  teamsListRef.doc(`${this.team5}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds5 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds5 = 0;
    }
  })
  teamsListRef.doc(`${this.team6}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds6 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds6 = 0;
    }
  })
  teamsListRef.doc(`${this.team7}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds7 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds7 = 0;
    }
  })
  teamsListRef.doc(`${this.team8}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds8 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds8 = 0;
    }
  })
  teamsListRef.doc(`${this.team9}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds9 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds9 = 0;
    }
  })
  teamsListRef.doc(`${this.team10}`).get().then((snap)=> {
    if (snap.data()){
    this.pounds10 = Number(snap.data().totalPoundsCarbon);
    } else {
      this.pounds10 = 0;
    }
  })

}

assignPoundsVariables(){
  console.log(this.poundsOrder);
  if (this.poundsOrder.length < 10){
    let diff = 10 - this.poundsOrder.length;
    for(let n = 0; n<diff; n++){
      this.poundsOrder.push(0);
    }
  }
  this.pounds1 = this.poundsOrder[0];
  this.pounds2 = this.poundsOrder[1];
  this.pounds3 = this.poundsOrder[2];
  this.pounds4 = this.poundsOrder[3];
  this.pounds5 = this.poundsOrder[4];
  this.pounds6 = this.poundsOrder[5];
  this.pounds7 = this.poundsOrder[6];
  this.pounds8 = this.poundsOrder[7];
  this.pounds9 = this.poundsOrder[8];
  this.pounds10 = this.poundsOrder[9];
}

retrieveCompletedPledges(){
  let teamsListRef = firebase.firestore().collection('teams')

  teamsListRef.doc(`${this.team1}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges1 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges1 = 0;
    }
  })

  teamsListRef.doc(`${this.team2}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges2 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges2 = 0;
    }
  })
  teamsListRef.doc(`${this.team3}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges3 = Number(snap.data().totalPledgesComplete);
    } else{
      this.pledges3 = 0;
    }
  })
  teamsListRef.doc(`${this.team4}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges4 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges4 = 0;
    }
  })

  teamsListRef.doc(`${this.team5}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges5 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges5 = 0;
    }
  })
  teamsListRef.doc(`${this.team6}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges6 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges6 = 0;
    }
  })
  teamsListRef.doc(`${this.team7}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges7 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges7 = 0;
    }
  })
  teamsListRef.doc(`${this.team8}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges8 = Number(snap.data().totalPledgesComplete);
    } else { 
      this.pledges8 = 0;
    }
  })
  teamsListRef.doc(`${this.team9}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges9 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges9 = 0;
    }
  })
  teamsListRef.doc(`${this.team10}`).get().then((snap)=> {
    if (snap.data()){
    this.pledges10 = Number(snap.data().totalPledgesComplete);
    } else {
      this.pledges10 = 0;
    }
  })


}


}
