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
  selector: 'app-ed5',
  templateUrl: './ed5.page.html',
  styleUrls: ['./ed5.page.scss'],
})
export class Ed5Page implements OnInit {
  public kidPledge: boolean = true;
  public teenPledge: boolean = true;
  public adultPledge: boolean = true;
  public pledgePicture: string = null;
  public hideVerfCard: boolean = false;
  public verification = '';
  public id = '';
  public pledgeVerificationUpdate: firebase.firestore.DocumentReference;
  
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
  }

getCurrent(){
  let view = this.router.url;
  let id = view.substr(1);
  return id;
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
    ed5: this.verification
  }
  //_________________________Get Team Info and Update Team Points and Update Team Pledge Progress Count_________________
  const teamRef = firebase.firestore().collection("teams").doc(`${team}`);
  let getTeam = teamRef.get().then(doc =>{
      var teamPoints = doc.data().points;
      let newTeamPoints = Number(teamPoints) + 250;   //Update with correct points

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
      let newCityPoints = Number(cityPoints) + 250;    //Update with correct points
      
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
      let newIndiPoints = Number(indiPoints) + 250;   //Update with correct points
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


}
