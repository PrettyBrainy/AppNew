import { ProfileService } from './../../services/user/profile.service';
import { VerifyServiceService } from './../../services/pledges/verify-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-hc6',
  templateUrl: './hc6.page.html',
  styleUrls: ['./hc6.page.scss'],
})
export class Hc6Page implements OnInit {
  public kidPledge: boolean = true;
  public teenPledge: boolean = true;
  public adultPledge: boolean = true;
  public hideVerfCard: boolean = false;
  public pledgePicture: string = null;
  public verification = '';
  private uid = '';
  public pledgeContent = '';
  public pledgeIsPending:boolean = true;
  public pledgeIsApproved: boolean = true;
  public pledgeSubmittedCard: boolean = true;
  public hideYourSubmissionHeading: boolean = false;
  public useCamera: boolean = true;
  public dontUseCamera: boolean = false;
  
  
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

  this.checkForPledgeContent();
  this.useCameraFunction();
  }

useCameraFunction(){

  let camera = firebase.firestore().collection('Conditionals').doc('camera').get().then((snap)=>{
    this.useCamera = snap.data().use;
    if(this.useCamera == true){
      this.dontUseCamera = false;
    }else{
      this.dontUseCamera = true;
    }

  })
  
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


verifyPledge(verification){
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
    hc6: this.verification
  }

  //__________________________________________Update Database with verification
  const verify = firebase.firestore().collection('userProfile').doc(`${uid}`).collection("pledges").doc("heatingAndCooling").update(verificationUpdate);
  })

this.hideVerfCard = true;
this.hideYourSubmissionHeading = true;
this.changePledgeApprovalStatus();
}



changePledgeApprovalStatus(){
let approvalStatus = {
  hc6: "pending"
}

const pending = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
.collection('approval').doc('heatingAndCooling').update(approvalStatus);
this.pledgeSubmittedCard = false;

}



checkForPledgeContent(){
  var user = firebase.auth().currentUser;
  if (user != null) {
    this.uid = user.uid;
  }
let verfCheck = firebase.firestore().collection('userProfile').doc(`${this.uid}`).collection('pledges').doc('heating-and-cooling').get().then((docSnapshot)=>{
  this.pledgeContent = docSnapshot.data().hc6;
  console.log(this.pledgeContent);

  //NEW CONTENT BELOW HERE
  if (this.pledgeContent.includes(' ') || this.pledgeContent.includes('.') || this.pledgeContent.includes(',')) {
    let approvalStatus={
      hc6: "approved"
    }
    this.hideVerfCard = true;
    const approved = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
    .collection('approval').doc('heatingAndCooling').update(approvalStatus);
    this.pledgeSubmittedCard = false;
  }
  if (this.pledgeContent !=''){
    let approvalStatus = {
      hc6: "pending"
    }
    this.hideVerfCard = true;
    const pending = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
    .collection('approval').doc('heatingAndCooling').update(approvalStatus);
    this.pledgeSubmittedCard = false;
  }
})
// NEW CONTENT ABOVE HERE
this.checkForPledgeStatus();
}



checkForPledgeStatus(){
  let statusCheck = firebase.firestore().collection('userProfile').doc(`${this.uid}`)
  .collection('approval').doc('heatingAndCooling').get().then((docSnapshot)=>{
    let status = String(docSnapshot.data().hc6);
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

