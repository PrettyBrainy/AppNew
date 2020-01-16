import { Router } from '@angular/router';
import { VerifyServiceService } from './../services/pledges/verify-service.service';
import { ProfileService } from './../services/user/profile.service';
import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-ed1',
  templateUrl: './ed1.page.html',
  styleUrls: ['./ed1.page.scss'],
})
export class Ed1Page implements OnInit {
  public kidPledge: boolean = true;
  public teenPledge: boolean = true;
  public adultPledge: boolean = true;
  public hideVerfCard: boolean = false;
  public pledgePicture: string = null;
  public verification = '';
  private uid = '';
  public pledgeContent = '';
  public pledgeIsPending:Boolean = true;
  public pledgeIsApproved: Boolean = true;
  
  constructor(
    public profileService: ProfileService,
    public verifyService: VerifyServiceService,
    public router: Router

  ) {}

  ngOnInit() {
    this.kidPledge = true;
    this.teenPledge = true;
    this.adultPledge = true;
    this.profileService.getUserProfile().then((userProfileSnapshot) => {
      if (userProfileSnapshot.data()) {
        var userAge = String(userProfileSnapshot.data().birthDate);
        if (userAge == "11-15"){
          this.kidPledge = false;
        }
        else if( userAge == "16-18"){
          this.teenPledge = false;
        }
        else if( userAge == "18-20" || userAge == "21+"){
          this.adultPledge = false;
        }
      }
    }
  )

  this.checkForPledgeContent()
  }



async takePicture(): Promise<void> {
  try {
    const profilePicture = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    this.pledgePicture = profilePicture.base64String;
  } catch (error) {
    console.error(error);
  }
}


verifyPledge(){
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
      var team = String(userProfileSnapshot.data().team);
      var indiPoints = Number(userProfileSnapshot.data().points)
    
  //_____________________________________________Call User ID
  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
    uid = user.uid; 
  }
  //__________________________________________Assign user input to variable
  let verificationUpdate = {
    ed1: this.verification
  }

  //_________________________Get Team Info and Update Team Points and Update Team Pledge Progress Count_________________
  const teamRef = firebase.firestore().collection("teams").doc(`${team}`);
  let getTeam = teamRef.get().then(doc =>{
      var teamPoints = doc.data().points;
      let newTeamPoints = Number(teamPoints) + 100;   //Update with correct points

      var teamPledgeCount = doc.data().edPledgeComplete;
      let newTeamPledgeCount = Number(teamPledgeCount) + 1;

      let newInfoTeam = {
        points: `${newTeamPoints}`,
        edPledgeComplete: `${newTeamPledgeCount}`
        }
      let updateTeamInfo = teamRef.update(newInfoTeam);
  })

  //_________________________Get City Info and Update City Points_________________
  const cityRef = firebase.firestore().collection("cityOverall").doc("cityOverall");
  let getCity = cityRef.get().then(doc => {
      var cityPoints = doc.data().points;
      let newCityPoints = Number(cityPoints) + 100;    //Update with correct points
      
      var cityPledgeCount = doc.data().edPledgeComplete;
      let newCityPledgeCount = Number(cityPledgeCount) + 1;
      
      
      let newInfoCity = {
        points: `${newCityPoints}`,
        edPledgeComplete: `${newCityPledgeCount}`
      }
      let updateCityInfo = cityRef.update(newInfoCity);
  })

  //_________________________Get User Info and Update User Points_________________
  const userRef = firebase.firestore().collection('userProfile').doc(`${uid}`);
  let getUser = userRef.get().then(doc=>{
      var userPoints = doc.data().points;
      let newIndiPoints = Number(indiPoints) + 100;   //Update with correct points
      let newPointsIndi = {
        points: `${newIndiPoints}`
      }
      let updateIndiPoints = userRef.update(newPointsIndi);
  })
  //__________________________________________Update Database with verification
  userRef.collection("pledges").doc("education").update(verificationUpdate);
  })
this.hideVerfCard = true;
}

checkForPledgeContent(){
  var user = firebase.auth().currentUser;
  if (user != null) {
    this.uid = user.uid;
  }
let verfCheck = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pledges').doc('education').get().then((docSnapshot)=>{
  this.pledgeContent = docSnapshot.data().ed1;
  console.log(this.pledgeContent);

  if (this.pledgeContent !=''){
    this.hideVerfCard = true;
  }
})
this.checkForPledgeStatus();
}

checkForPledgeStatus(){
  let statusCheck = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('education').get().then((docSnapshot)=>{
    let status = String(docSnapshot.data().ed1);
    console.log(status);
    if(status == 'pending'){
      console.log(status);
      this.hideVerfCard = true;
      this.pledgeIsPending = false;
    } else if (status == "approved"){
      this.hideVerfCard = true;
      this.pledgeIsApproved = false;
    } else {
      this.hideVerfCard = false;
      this.pledgeIsApproved = true;
      this.pledgeIsPending = true;
    }
  })
}


}
