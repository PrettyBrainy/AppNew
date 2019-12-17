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
  private code: string;
  private uid: string;
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
        if (userAge != 'undefined'){
          this.age = true;
          this.ageRange = true;
          this.drop = true;
          }
        else {
          this.age = false;
          this.ageRange = false;
          this.drop = false;
        }  
      }
  
    }
    )

  //_______________________Check For Teams
  var teamCheck = this.checkForTeam();
  if (teamCheck != 'undefined'){
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
  this.code = accessCode;
  const teamRef = firebase.firestore().collection('teams').doc(`${teamId}`)
  const teamsList = firebase.firestore().collection('teams')
  teamRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        alert(teamId + ' is already in use by another team! Pick another name.');
      } else {
      
      var user = firebase.auth().currentUser;
      if (user != null) {
        this.uid = user.uid; 
      } 
     
      var teamName = {
        team: `${teamId}`
      }
      var access = {
        accessCode: this.code,
        user1: this.uid,
        teamUsers: 1
      }
      let addTeamToUser = firebase.firestore().collection('userProfile').doc(`${this.uid}`).set(teamName);
      let createTeam = teamsList.doc(`${teamId}`).set(access);
      alert('Success! Team ' + teamId + ' has been created! Send your Team Name and access code to your friends now.')
      this.showTeam = false;
      this.showTeamButtons = true;
      }
      });
  }

joinTeam(teamId: string, accessCode:string){
  this.code = accessCode;
  const teamRef = firebase.firestore().collection('teams').doc(`${teamId}`)
  const teamsList = firebase.firestore().collection('teams')
  teamRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      let access = String(docSnapshot.data().accessCode);
      let numUsersOnTeam = Number(docSnapshot.data().teamUsers);
      numUsersOnTeam += 1;
      if (access == this.code){

        var user = firebase.auth().currentUser;
        if (user != null) {
          this.uid = user.uid; 
        } 
       
        var teamName = {
          team: `${teamId}`
        }
        
        var trackUsers = {
          teamUsers: `${numUsersOnTeam}`
        }

        let addUserToTeam = teamRef.update(trackUsers);
        let addTeamToUser = firebase.firestore().collection('userProfile').doc(`${this.uid}`).set(teamName);
      }else {
        alert('Access code is incorrect! Double check your spelling and try again (:')
      }

    } else {
      alert(teamId + ' does not exist! Create a new team now')
    }
})
}

checkForTeam(){
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      this.team = String(userProfileSnapshot.data().team)
    }
  })
return this.team;}


async createTeamAlert() {
  const alert = await this.alertCtrl.create({
    inputs: [
      {
        name: 'teamName',
        placeholder: 'Name Your Team'
      },
      {
        name: 'accessCode',
        placeholder: 'Set a Team Access Code'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Create Team',
        handler: data => {
          this.createTeam(data.teamName, data.accessCode);
      }
      }],
  });
  await alert.present();

}


async joinTeamAlert() {
  const alert = await this.alertCtrl.create({
    inputs: [
      {
        name: 'teamName',
        placeholder: 'Enter Your Team Name'
      },
      {
        name: 'accessCode',
        placeholder: 'Enter Your Team\'s Access Code'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Create Team',
        handler: data => {
          this.joinTeam(data.teamName, data.accessCode);
      }
      }],
  });
  await alert.present();

}



}
