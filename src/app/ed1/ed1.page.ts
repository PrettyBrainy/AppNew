import { Router } from '@angular/router';
import { VerifyServiceService } from './../services/pledges/verify-service.service';
import { ProfileService } from './../services/user/profile.service';
import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-ed1',
  templateUrl: './ed1.page.html',
  styleUrls: ['./ed1.page.scss'],
})
export class Ed1Page implements OnInit {
  public kidPledge: boolean = true;
  public teenPledge: boolean = true;
  public adultPledge: boolean = true;
  public pledgePicture: string = null;
  public verification = '';
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
  let id = this.verifyService.getCurrent();
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
const id = this.getCurrent();
console.log(id);
}


}
