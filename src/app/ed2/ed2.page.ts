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
  selector: 'app-ed2',
  templateUrl: './ed2.page.html',
  styleUrls: ['./ed2.page.scss'],
})
export class Ed2Page implements OnInit {
  public kidPledge: boolean = true;
  public teenPledge: boolean = true;
  public adultPledge: boolean = true;
  public pledgePicture: string = null;
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
console.log(this.verification);
var id = this.getCurrent();
console.log(id);
//_____________________________________________Call User ID
var user = firebase.auth().currentUser;
var uid;
if (user != null) {
  uid = user.uid; 
}
//__________________________________________Assign user input to variable
let verificationUpdate = {
  ed2: this.verification
}
//__________________________________________Update Database
this.pledgeVerificationUpdate = firebase.firestore().collection('userProfile').doc(`${uid}`);
this.pledgeVerificationUpdate.collection("pledges").doc("education").update(verificationUpdate);
}

}
