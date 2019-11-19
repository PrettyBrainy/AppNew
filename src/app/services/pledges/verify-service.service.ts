import { Router } from '@angular/router';
import { AuthService } from './../user/auth.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class VerifyServiceService {

  constructor(private authService: AuthService,
              private router: Router) { }
              public createPledgeList: firebase.firestore.DocumentReference;

getCurrent(){
  let view = this.router.url;
  let id = view.substr(1);
}

verifyText(verf: string){
const id = this.getCurrent();
var user = firebase.auth().currentUser;
var uid;
if (user != null) {
  uid = user.uid; 
}

this.createPledgeList = firebase.firestore().collection('userProfile').doc(`${uid}`);



}

}
