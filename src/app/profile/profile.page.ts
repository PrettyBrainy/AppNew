import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
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
    private navCtrl: NavController
  
  ) {}

  ngOnInit() {

    //____________________Pull User Data from Firebase
    this.profileService.getUserProfile().then((userProfileSnapshot) => {
      if (userProfileSnapshot.data()) {
        this.userProfile = userProfileSnapshot.data();
      }
    });

//_______________________Check to display age dropdown
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

  //_______________________Checks to see if user has a team and hides correct information
  this.profileService.getUserProfile().then((userProfileSnapshot) => {
    if (userProfileSnapshot.data()) {
      this.team = String(userProfileSnapshot.data().team);
      if (this.team != 'undefined'){
        this.showTeam = false;
        this.showTeamButtons = true;
      } else {
        this.showTeam = true;
        this.showTeamButtons = false;
      }
    }
  })
}

//_______________Logout function. Redirects to Login Page.
logOut(): void {
  this.authService.logoutUser().then( () => {
    this.router.navigate(['/login']);
  });
}

//_____________Change User First/Last Name
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
          this.refreshProfilePage();
        },
      },
    ],
  });
  await alert.present();
}

//____________________________Refresh the profile page
refreshProfilePage(){
  window.location.reload()
}

//__________________________Update Age Range
updateDOB(birthDate: string): void {
  if (birthDate === undefined) {
    return;
  }
  this.profileService.updateDOB(birthDate);
  this.refreshProfilePage();
}

//___________________Update User Email
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
              this.refreshProfilePage();
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


//____________________________Update User Password
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

//_______Shows/Hides info correct for 11-15 years old
lowAge(){
  this.age = true;
  this.drop = true;
  this.lAge = false;
  this.mAge = true;
  this.hAge = true;
  this.oAge = true;
  this.updateDOB('11-15');
}

//_______Shows/Hides info correct for 16-18 years old
midAge(){
  this.age = true;
  this.drop = true;
  this.mAge = false;
  this.lAge = true;
  this.hAge = true;
  this.oAge = true;
  this.updateDOB('16-18');
}

//_______Shows/Hides info correct for 18-21 years old
highAge(){
  this.age = true;
  this.drop = true;
  this.hAge = false;
  this.lAge =  true;
  this.mAge = true;
  this.oAge = true;
  this.updateDOB('18-20');
}

//_______Shows/Hides info correct for 21+ years old
oldAge(){
  this.age = true;
  this.drop = true;
  this.hAge = true;
  this.lAge =  true;
  this.mAge = true;
  this.oAge = false;
  this.updateDOB('21+');
}

//_________________________Create Team Function
createTeam(teamId: string, accessCode: string) {
  this.code = accessCode;
  const teamRef = firebase.firestore().collection('teams').doc(`${teamId}`)
  const teamsList = firebase.firestore().collection('teams')
  
  //___________________Check to see if team name is in use.
  teamRef.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        alert(teamId + ' is already in use by another team! Pick another name.');
      } else {
  //_____________________Create the team with user information and one user on team.
      var user = firebase.auth().currentUser;
      if (user != null) {
        this.uid = user.uid; 
      }
      var teamName = {
        team: `${teamId}`
      }
      var access = {
        accessCode: this.code,
        teamUsers: 1,
        teamPoints: 0,
        edPledgeComplete: 0,
        plPledgeComplete: 0,
        cPledgeComplete: 0,
        lPledgeComplete: 0,
        tpPledgeComplete: 0,
        tyPledgeComplete: 0,
        epPledgeComplete: 0,
        totalPoundsCarbon: 0,
      }

      let userArray = {users: [this.uid]};
      let addTeamToUser = firebase.firestore().collection('userProfile').doc(`${this.uid}`).update(teamName);
      let createTeam = teamsList.doc(`${teamId}`).set(access);
      let addUser = teamRef.update(userArray);
      alert('Success! Team ' + teamId + ' has been created! Send your Team Name and access code to your friends now.')
      this.showTeam = false;
      this.showTeamButtons = true;
      }
      });
    //_______________Increase number of teams in city, refresh page so correct team information shows
    this.increaseCityTeamCount();
    this.refreshProfilePage();
  }


//________________________Join Team Function
joinTeam(teamId: string, accessCode:string){
  this.code = accessCode;
  const teamRef = firebase.firestore().collection('teams').doc(`${teamId}`)
  teamRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
      let access = String(docSnapshot.data().accessCode);
      let numUsersOnTeam = Number(docSnapshot.data().teamUsers);
      
      //_____Increase number of team members
      numUsersOnTeam += 1;
      
      if (access == this.code){                           //check to see if access codes match
        var user = firebase.auth().currentUser;
        if (user != null) {
          this.uid = user.uid; 
        } 
      
        let userData = docSnapshot.data().users;
        let userArray = String(userData);               //store all existing users in string
        this.array = userArray.split(',');              //split string to array by comemnts
        this.array.push(this.uid);                      //Add current user

        var teamName = {
          team: `${teamId}`
        }

        var trackUsers = {
          teamUsers: `${numUsersOnTeam}`
        }

        var addUsers = {
          users: this.array
        }

        let increaseNumUsers = teamRef.update(trackUsers);    //Update number of users with new number
        let updateAllUsers = teamRef.update(addUsers);        //Update user array to include current user
        let addTeamToUser = firebase.firestore().collection('userProfile').doc(`${this.uid}`).update(teamName); //Update user profile to include team
        this.refreshProfilePage();      //Refresh page to reflect changes.
      }else {
        alert('Access code is incorrect! Double check your spelling and try again (:') //Wrong Access Code alert
      }

    } else {
      alert(teamId + ' does not exist! Create a new team now.')           //Team does not exist alert
    }
})
 
}

//____________________Increase number of teams in cityOverall collection in Firebase
increaseCityTeamCount(){
  let cityOverall = firebase.firestore().collection('cityOverall').doc('cityOverall').get().then((docSnapshot) => {
    var numTeams = docSnapshot.data().totalTeams;
    numTeams +=1;
    var update = {
      totalTeams: `${numTeams}`,
    }
    let updateTeams = firebase.firestore().collection('cityOverall').doc('cityOverall').update(update);
  })

}

//______________________________Alert where users will enter new team info
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

//______________________________Alert where users enter existing team information
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
        text: 'Join This Team',
        handler: data => {
          this.joinTeam(data.teamName, data.accessCode);
      }
      }],
  });
  await alert.present();

}


}
