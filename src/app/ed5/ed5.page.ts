import { ProfileService } from './../services/user/profile.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ed5',
  templateUrl: './ed5.page.html',
  styleUrls: ['./ed5.page.scss'],
})
export class Ed5Page implements OnInit {

  public kidPledge: boolean = true;
  public teenPledge: boolean = true;
  public adultPledge: boolean = true;
  constructor(
    public profileService: ProfileService
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


}
