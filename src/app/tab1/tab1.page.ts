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
  x:number;
  public userPoints:number;
  public userProfile: any;
  constructor(private profileService: ProfileService) 
  { this.x=45 }


ngOnInit() {
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      var userPoints = Number(userProfileSnapshot.data().points);
      this.userPoints = Number(userPoints)
    console.log(this.userPoints); 
    }
  })
  }
}


