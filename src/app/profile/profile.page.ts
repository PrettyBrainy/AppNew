import { Tab1PageModule } from './../tab1/tab1.module';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from './../services/user/auth.service';
import { ProfileService } from './../services/user/profile.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userProfile: any;
  public birthDate: Date;
  public age: boolean = false;
  public ageRange: boolean = false;
  public drop: boolean = false;
  public lAge: boolean=true;
  public mAge: boolean=true;
  public hAge: boolean=true;
  public oAge: boolean=true;
  public array: any;
  public team: string;
  public showTeam: boolean = false;
  public showTeamButtons: boolean = true;
  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
  
  ) {}

  ngOnInit() {

    this.profileService.getUserProfile().then((userProfileSnapshot) => {
      if (userProfileSnapshot.data()) {
        this.userProfile = userProfileSnapshot.data();
      }
    });

    this.profileService.getUserProfile().then((userProfileSnapshot) => {
      if (userProfileSnapshot.data()) {
        var userAge = String(userProfileSnapshot.data().birthDate);
        if (userAge == "11-15" || "16-18" || "18-20" || "21+"){
        this.age = true;
        this.ageRange = true;
        this.drop = true;
        }
        else if (userAge != "11-15" || "16-18" || "18-20" || "21+"){
          this.age = false;
          this.ageRange = false;
          this.drop = false;
        }
      }
  
    }
    )

  //_______________________Check For Teams
  var teamCheck = this.checkForTeam();
  if (teamCheck!=undefined){
    this.showTeam = true;
    this.showTeamButtons = false;
  } else {
    this.showTeam = false;
    this.showTeamButtons = true;
  }
 
}

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('login');
    });
  }


  async updateName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      subHeader: 'Your first name & last name',
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName,
        },
        {
          type: 'text',
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName,
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updateName(data.firstName, data.lastName);
          },
        },
      ],
    });
    await alert.present();
  }

  updateDOB(birthDate: string): void {
    if (birthDate === undefined) {
      return;
    }
    this.profileService.updateDOB(birthDate);
  }


  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          },
        },
      ],
    });
    await alert.present();
  }
  
  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
            );
          },
        },
      ],
    });
    await alert.present();
  }

lowAge(){
  this.age = true;
  this.drop = true;
  this.lAge = false;
  this.mAge = true;
  this.hAge = true;
  this.oAge = true;
  this.updateDOB('11-15');
}

midAge(){
  this.age = true;
  this.drop = true;
  this.mAge = false;
  this.lAge = true;
  this.hAge = true;
  this.oAge = true;
  this.updateDOB('16-18');
}

highAge(){
  this.age = true;
  this.drop = true;
  this.hAge = false;
  this.lAge =  true;
  this.mAge = true;
  this.oAge = true;
  this.updateDOB('18-20');
}

oldAge(){
  this.age = true;
  this.drop = true;
  this.hAge = true;
  this.lAge =  true;
  this.mAge = true;
  this.oAge = false;
  this.updateDOB('21+');
}

createTeam(teamId: string, accessCode: string) {

  const teamRef = firebase.firestore().collection('teams').doc(`${teamId}`)
  const teamsList = firebase.firestore().collection('teams')
  teamRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        alert('user ' + teamId + ' exists!');
      } else {
      var teamName = teamId;
      var accessCode = accessCode;
      teamsList.doc(teamName).set(accessCode)
      }
      });
  
  }
checkForTeam(){
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      this.team = String(userProfileSnapshot.data().team)
    }
  })
return this.team;}



}
