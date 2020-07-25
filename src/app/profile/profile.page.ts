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
  public userAgeInput: string;
  public showIfAgeChangeMade: boolean;
  public showIfAgeInDB: boolean;
  public showIfTeamChangeMade: boolean;
  public userTeamInput: string;
  public showTeamName: boolean;
  public showIfNameChangeMade: boolean;
  public showName: boolean;
  public userFirstNameInput: string;
  public userLastNameInput: string;
  public changedEmailOld: boolean;
  public changedEmailNew: boolean = true;
  public userEmailInput: string;
  public dbName: boolean;
  public dbAge: boolean;
  public newName: boolean;
  public newAge: boolean;
  public hideProfileCompleteNotice: boolean = true;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private navCtrl: NavController
  
  ) {}

  ngOnInit() {
    this.showIfAgeChangeMade = true;
    this.showIfNameChangeMade = true;

    //____________________Pull User Data from Firebase
    this.profileService.getUserProfile().then((userProfileSnapshot) => {
      if (userProfileSnapshot.data()) {
        this.userProfile = userProfileSnapshot.data();
        if (this.userProfile.birthDate != undefined){
          this.showIfAgeChangeMade = true;
          this.dbAge = true;
        } else{
          this.dbAge = false;
        }
        if(this.userProfile.firstName != undefined ||this.userProfile.firstName != undefined){
          this.dbName = true;
        } else {
          this.dbName = false;
        }
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
      this.team = userProfileSnapshot.data().team;
      if (userProfileSnapshot.data().team != undefined){
        this.showTeamName = false;
        this.showTeamButtons = true;
        this.showIfTeamChangeMade = true;
      } else {
        this.showTeamName = true;
        this.showTeamButtons = false;
        this.showIfTeamChangeMade = true;
      }
      if (userProfileSnapshot.data().firstName != undefined || userProfileSnapshot.data().lastName != undefined){
        this.showName = false;
        this.showIfNameChangeMade = true;
      } else{
        this.showIfNameChangeMade = true;
        this.showName = false;
      }
    }
  })
}

profileComplete(){
  if((this.userFirstNameInput != undefined) || (this.userLastNameInput != undefined)){
    if(this.userAgeInput != undefined){
          this.hideProfileCompleteNotice = false;  
    }
  }
  
  this.profileService.getUserProfile().then((user) => {
    if (user.data()) {
      let fn = user.data().firstName;
      let ln = user.data().lastName;
      let bd = user.data().birthDate;
      if(((fn != undefined) || (ln != undefined)) && (this.userAgeInput != undefined)){
        console.log("Name in DB, user age entered: ", fn, ln, this.userAgeInput)
        this.hideProfileCompleteNotice = false;
      }
      if((bd != undefined) && ((this.userFirstNameInput != undefined) || (this.userLastNameInput != undefined))){
        console.log("Age in db and name entered", bd, this.userFirstNameInput, this.userLastNameInput)
        this.hideProfileCompleteNotice = false;
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
          this.showIfNameChangeMade = false;
          this.showName = true;
          this.userFirstNameInput = data.firstName;
          this.userLastNameInput = data.lastName;
          this.newName = true;
          this.profileComplete();
        },
      },
    ],
  });
  await alert.present();
}


//__________________________Update Age Range
updateDOB(range: string) {
var ageRange = {
  birthDate:  `${range}`
}
var user = firebase.auth().currentUser;
if (user != null) {
  this.uid = user.uid;
}
const updateAge = firebase.firestore().collection('userProfile').doc(`${this.uid}`).update(ageRange);
this.showIfAgeInDB = true;
this.showIfAgeChangeMade = false;
}


async updateDOBAlert(): Promise<void> {
  const alert = await this.alertCtrl.create({
    subHeader: 'Your age range',
    inputs: [
      { type: 'radio', name: 'youngAge', value: '11-15', label: '11-15'},
      { type: 'radio', name:'teenAge', value: '16-18', label: '16-18 (in high school)'},
      { type: 'radio', name:'youngAdultAge', value: '18-20', label: '18-20'}, 
      { type: 'radio', name:'adultAge', value:'21+', label: '21+'},
    ],
    buttons: [
      { text: 'Cancel' },
      {
        text: 'Save',
        handler: data => {
          this.userAgeInput = String(data);
          this.newAge = true;
          this.updateDOB(this.userAgeInput);
          this.profileComplete();
        },
      },
    ],
  });
  await alert.present();
}

correctAge(ageStuff: string){
    this.updateDOB(ageStuff);
    this.age = true;
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
              this.changedEmailNew = false;
              this.changedEmailOld = true;
              this.userEmailInput = data.newEmail;
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
        CPledgeComplete: 0,
        lPledgeComplete: 0,
        tpPledgeComplete: 0,
        tyPledgeComplete: 0,
        epPledgeComplete: 0,
        totalPoundsCarbon: 0,
        totalPledgesComplete: 0
      }

      let userArray = {users: [this.uid]};
      let addTeamToUser = firebase.firestore().collection('userProfile').doc(`${this.uid}`).update(teamName);
      let createTeam = teamsList.doc(`${teamId}`).set(access);
      let addUser = teamRef.update(userArray);
      alert('Success! Team ' + teamId + ' has been created! Send your Team Name and access code to your friends now.')
      this.userTeamInput = teamId;
      this.showTeamButtons = true;
      this.showIfTeamChangeMade = false;
      this.showTeamName = true;
      this.showTeamButtons = true;
      }
      });
    //_______________Increase number of teams in city
    this.increaseCityTeamCount();
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
        this.userTeamInput = teamId;
        this.showIfTeamChangeMade = false;
        this.showTeamName = true;
        this.showTeamButtons = true;
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
    var numTeams = Number(docSnapshot.data().totalTeams);
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
