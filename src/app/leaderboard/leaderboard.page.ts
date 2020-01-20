
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
public team2 = String;
public team3 = '';
public team4 = '';
public team5 = '';
public team6 = '';
public team7 = '';
public team8 = '';
public team9 = '';
public team10 = '';
public poundsOrder: Array<Number>;
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

  constructor() { }

  ngOnInit() {
  this.orderByPounds();

    
  }


orderByPounds(){
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

      let orderedTeamNames = [];
      for( let n = 0; n<sortThisArray.length; n++){
        for (let i = 0; i<sortThisArray.length; i++)
          if (sortThisArray[i][1] == poundsOrder[n]){
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
      this.team10 = orderedTeamNames[9];

      this.assignPoundsVariables();

  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
//console.log(teamsArray);
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


}

