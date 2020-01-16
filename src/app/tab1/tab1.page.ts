import { Component, OnInit} from '@angular/core';
import { ProfileService } from './../services/user/profile.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  public userPoints:number;
  public userProfile: any;
  public team: String;
  public teamPoints: Number;
  public hideTeamProgressBar: Boolean;
  public teamProgressBar: Number;
  public uid: '';
  public cityTotalPledgeCount: Number;
  public cityUserNumber: Number;
  public cityProgressBar: Number;
  public teamPledgeCount: Number;
  public teamUsers: Number;
  public teamTotalPledgeCount: Number;
  public totalPledgesPossiblePerUser: Number;
  public userProgressBar: Number;
  constructor(private profileService: ProfileService) {}


ngOnInit() {
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      this.userPoints = Number(userProfileSnapshot.data().points);
      this.team= String(userProfileSnapshot.data().team);
      let teamPointsSearch = firebase.firestore().collection('teams').doc(`${this.team}`).get().then((docSnapshot)=>{
        this.teamPoints = Number(docSnapshot.data().points);
        this.teamTotalPledgeCount = Number(docSnapshot.data().totalPledgesComplete)

      })
    }
    else{
      this.userPoints = 0;
      this.teamPoints = 0;
    }
  })

this.teamAndCityProgressBarTotals();
this.getUserProgressBar();
}



teamAndCityProgressBarTotals(){
this.profileService.getUserProfile().then((userProfileSnapshot) => {

    this.userPoints = Number(userProfileSnapshot.data().points);
    this.team= String(userProfileSnapshot.data().team);
    
//______________________________________Check for team, show team progress bar if user has team

    if (this.team == 'undefined'){
      this.hideTeamProgressBar = true;

      //__________________________________Get City info for city progress bar
      let cityCount = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityTotalPledgeCount = Number(docSnapshot.data().edPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);

        var totalCityPledges = 5*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityTotalPledgeCount)/totalCityPledges)*100);
      })

    } else{
      
      //__________________________________Get team info for team progress bar
      let getTeamInfo = firebase.firestore().collection('teams').doc(`${this.team}`).get().then((docSnapshot)=>{

      this.teamPoints = Number(docSnapshot.data().teamPoints);
      this.teamTotalPledgeCount = Number(docSnapshot.data().totalPledgesComplete)
      this.teamUsers = Number(docSnapshot.data().teamUsers);
      
      //__________________________________Get City info for city progress bar
      let getCityInfo = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.cityTotalPledgeCount = Number(docSnapshot.data().edPledgeComplete);
        this.cityUserNumber = Number(docSnapshot.data().totalUsers);
        this.totalPledgesPossiblePerUser = Number(docSnapshot.data().totalPossiblePledgesPerUser);
  
        var totalTeamPledges = Number(this.totalPledgesPossiblePerUser) * Number(this.teamUsers);
        this.teamProgressBar = Number((Number(this.teamTotalPledgeCount)/totalTeamPledges)*100);
      
        var totalCityPledges = Number(this.totalPledgesPossiblePerUser)*Number(this.cityUserNumber);
        this.cityProgressBar = Number((Number(this.cityTotalPledgeCount)/totalCityPledges)*100);
      })
    }) 

    }
  })
}  

getUserProgressBar(){
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      let userPledges = Number(userProfileSnapshot.data().totalPledgesComplete)
      
      let getCityInfo = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot)=>{
        this.totalPledgesPossiblePerUser = Number(docSnapshot.data().totalPossiblePledgesPerUser);

        this.userProgressBar = (Number(userPledges)/Number(this.totalPledgesPossiblePerUser))*100;
        console.log(this.userProgressBar);

      })
    
    }
  })
}

}

