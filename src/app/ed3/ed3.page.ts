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
  selector: 'app-ed3',
  templateUrl: './ed3.page.html',
  styleUrls: ['./ed3.page.scss'],
})
export class Ed3Page implements OnInit {
  public kidPledge: boolean = true;
  public teenPledge: boolean = true;
  public adultPledge: boolean = true;
  public pledgePicture: string = null;
  public hideVerfCard: boolean = false;
  public verification = '';
  public id = '';
  public pledgeVerificationUpdate: firebase.firestore.DocumentReference;
  private uid = '';
  public pledgeContent = '';
  public pledgeIsPending:boolean = true;
  public pledgeIsApproved: boolean = true;
  public pledgeSubmittedCard: boolean = true;
  public hideYourSubmissionHeading: boolean = false;

  
  constructor(
    public profileService: ProfileService,
    public verifyService: VerifyServiceService,
    public router: Router

  ) {}

  ngOnInit() {
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.uid = user.uid; 
    }
    this.checkForPledgeContent()

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
    ed3: this.verification
  }

  //__________________________________________Update Database with verification
  const verify = firebase.firestore().collection('userProfile').doc(`${uid}`).collection("pledges").doc("education").update(verificationUpdate);
  })

this.hideVerfCard = true;
this.hideYourSubmissionHeading = true;
this.changePledgeApprovalStatus();
}



changePledgeApprovalStatus(){


let approvalStatus = {
  ed3: "pending"
}
const pending = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
.collection('approval').doc('education').update(approvalStatus);
this.pledgeSubmittedCard = false;
}



checkForPledgeContent(){
  var user = firebase.auth().currentUser;
  if (user != null) {
    this.uid = user.uid;
  }
let verfCheck = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pledges').doc('education').get().then((docSnapshot)=>{
  this.pledgeContent = docSnapshot.data().ed3;
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
    let status = String(docSnapshot.data().ed3);
    console.log(status);
    if(status == 'pending'){
      console.log(status);
      this.hideVerfCard = true;
      this.pledgeIsPending = false;
      this.pledgeSubmittedCard = false;
    } else if (status == "approved"){
      this.hideVerfCard = true;
      this.pledgeIsApproved = false;
      this.pledgeSubmittedCard = false;
    } else {
      this.hideVerfCard = false;
      this.pledgeIsApproved = true;
      this.pledgeIsPending = true;
      this.pledgeSubmittedCard = true;
    }
  })
}

}


