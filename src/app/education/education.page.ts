  
import { EventService } from './../services/pledges/pledge-service.service';
import { AuthService } from '../services/user/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../services/user/profile.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-education',
  templateUrl: './education.page.html',
  styleUrls: ['./education.page.scss'],
})
export class EducationPage implements OnInit {
x:number;
public hideButton: boolean=false;
public hideText: boolean=false;
public incompletePledge1: boolean=true;
public incompletePledge2: boolean=true;
public incompletePledge3: boolean=true;
public incompletePledge4: boolean=true;
public incompletePledge5: boolean=true;
public hidePledges: boolean=true;
public completePledge1: boolean=false;
public completePledge2: boolean=false;
public completePledge3: boolean=false;
public completePledge4: boolean=false;
public completePledge5: boolean=false;
public createPledgeList: firebase.firestore.DocumentReference;
public pledgeListRef: firebase.firestore.CollectionReference;
public array: Array<any>;
  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private eventService: EventService) { this.x=45 }

  ngOnInit() {
    
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null) {
      uid = user.uid; 
    }
    
   this.array = []
    this.eventService.checkModuleStart().then( pledgeListSnapshot => {
      pledgeListSnapshot.forEach(snap => {
        this.array.push({})
      if(this.array.length>0){
        this.hideButton=true;
        this.hideText=true;
        this.hidePledges=false;
        this.incompletePledge1=false;
        this.incompletePledge2=false;
        this.incompletePledge3=false;
        this.incompletePledge4=false;
        this.incompletePledge5=false;
      }

    })
  }) 
//__________________________________________ Show/Hide for ed1
let data1 = firebase.firestore().collection('userProfile').doc(`${uid}`).collection('pledges').doc('education').get()
.then((docSnapshot) =>{
  var ed1Verf = String(docSnapshot.data().ed1); 
  console.log(ed1Verf)
  if (ed1Verf == ' '){
    this.incompletePledge1=false;
    this.completePledge1=true;
    console.log("no data - 1");
  }
  else{
    this.incompletePledge1=true;
    this.completePledge1=false;
    console.log("has data - 1");
  }

}) 
//__________________________________________ Show/Hide for ed2
let data2 = firebase.firestore().collection('userProfile').doc(`${uid}`).collection('pledges').doc('education').get()
.then((docSnapshot) =>{
  var ed2Verf = String(docSnapshot.data().ed2); 
  console.log(ed2Verf)
  if (ed2Verf == ' '){
    this.incompletePledge2=false;
    this.completePledge2=true;
    console.log("no data - 2");
  }
  else{
    this.incompletePledge2=true;
    this.completePledge2=false;
    console.log("has data - 2");
  }

}) 
//__________________________________________ Show/Hide for ed3
let data3 = firebase.firestore().collection('userProfile').doc(`${uid}`).collection('pledges').doc('education').get()
.then((docSnapshot) =>{
  var ed3Verf = String(docSnapshot.data().ed3); 
  console.log(ed3Verf)
  if (ed3Verf == ' '){
    this.incompletePledge3=false;
    this.completePledge3=true;
    console.log("no data - 3");
  }
  else{
    this.incompletePledge3=true;
    this.completePledge3=false;
    console.log("has data - 3");
  }

}) 
//__________________________________________ Show/Hide for ed4
let data4 = firebase.firestore().collection('userProfile').doc(`${uid}`).collection('pledges').doc('education').get()
.then((docSnapshot) =>{
  var ed4Verf = String(docSnapshot.data().ed4); 
  console.log(ed4Verf)
  if (ed4Verf == ' '){
    this.incompletePledge4=false;
    this.completePledge4=true;
    console.log("no data - 4");
  }
  else{
    this.incompletePledge4=true;
    this.completePledge4=false;
    console.log("has data - 4");
  }

}) 

//__________________________________________ Show/Hide for ed5
let data = firebase.firestore().collection('userProfile').doc(`${uid}`).collection('pledges').doc('education').get()
.then((docSnapshot) =>{
  var ed5Verf = String(docSnapshot.data().ed5); 
  console.log(ed5Verf)
  if (ed5Verf == ' '){
    this.incompletePledge5=false;
    this.completePledge5=true;
    console.log("no data - 5");
  }
  else{
    this.incompletePledge5=true;
    this.completePledge5=false;
    console.log("has data - 5");
  }

}) 


//__________________________________________ Try a Show/Hide with for loop
/*var edArray = ['ed1', 'ed2', 'ed3', 'ed4', 'ed5'];
let tryLoop = firebase.firestore().collection('userProfile').doc(`${uid}`).collection('pledges').doc('education').get()
.then((docSnapshot) =>{

 for (let n; n = 0; n<=4) {

var tryString = edArray[n];
var Verf = String(docSnapshot.data().tryString); 
  console.log(Verf);
  if (Verf == ' '){
    this.incompletePledge5=false;
    this.completePledge5=true;
    console.log("no data - 5");
  }
  else{
    this.incompletePledge5=true;
    this.completePledge5=false;
    console.log("has data - 5");
  }
n++
 }
  

}) */

}
  



startEdModule(){
  this.hideButton=true;
  this.hideText=true;
  this.hidePledges=false;
  this.incompletePledge1=false;
  this.incompletePledge2=false;
  this.incompletePledge3=false;
  this.incompletePledge4=false;
  this.incompletePledge5=false;

  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
    uid = user.uid; 
  }
  
  this.createPledgeList = firebase.firestore().collection('userProfile').doc(`${uid}`);
  let pledges = {
    ed1: " ",
    ed2: " ",
    ed3: " ",
    ed4: " ",
    ed5: " ",
  }
  this.createPledgeList.collection("pledges").doc("education").set(pledges);
  
}

countPledges(){

  }

}
