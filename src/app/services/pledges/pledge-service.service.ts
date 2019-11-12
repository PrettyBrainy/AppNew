import { ProfileService } from './../user/profile.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AuthService } from '../user/auth.service';
import { MethodCall } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  public eventListRef: firebase.firestore.CollectionReference;
  public genEventList: firebase.firestore.CollectionReference;
  public genPledgeList: firebase.firestore.CollectionReference;
  public pulledEvents: Array<any>;
  constructor(private authService: AuthService) {}

async getEventList(): Promise<firebase.firestore.QuerySnapshot> {
  const user: firebase.User = await this.authService.getUser();
  this.eventListRef = firebase
    .firestore()
    .collection(`userProfile/${user.uid}/edNewPledges`);
  return this.eventListRef.get();
}

/* ------------ These functions are to get pledges for the varying age groups to be copied to each user*/
checkModuleStart(): Promise<firebase.firestore.QuerySnapshot> {
  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
    uid = user.uid; 
  }
  this.genPledgeList = firebase
  .firestore()
  .collection(`userProfile/${uid}/pledges`)
  return this.genPledgeList.get();
}


pullEventListKids(): Promise<firebase.firestore.QuerySnapshot> {
  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
    uid = user.uid; 
  }
  this.genPledgeList = firebase
  .firestore()
  .collection(`userProfile/${uid}/pledges`)
  return this.genPledgeList.get();
}

pullEventListTeens(): Promise<firebase.firestore.QuerySnapshot> {
  this.genEventList = firebase
    .firestore()
    .collection("edPledgeListTeens");
  return this.genEventList.get();
}

pullEventListAdults(): Promise<firebase.firestore.QuerySnapshot> {
  this.genEventList = firebase
    .firestore()
    .collection("edPledgeListAdults");
  return this.genEventList.get();
}


createEvent(
  name: string,
  impact: number,
  learning: string,
  pledgeDetails: string,
  pledge: string
): Promise<firebase.firestore.DocumentReference> {
  return this.eventListRef.add({
    name: name,
    impact: impact,
    learning: learning,
    pledgeDetails: pledgeDetails,
    pledge: pledge
  });
}

async getEventDetail(
  eventId: string
): Promise<firebase.firestore.DocumentSnapshot> {
  const user: firebase.User = await this.authService.getUser();
  this.eventListRef = firebase
    .firestore()
    .collection(`userProfile/${user.uid}/edNewPledges`);
  return this.eventListRef.doc(eventId).get();
}



verifyPledge(
  verification: string,
  eventId: string,
  eventPrice: number,
  guestPicture: string = null
): Promise<void> {
  return this.eventListRef
    .doc(eventId)
    .collection('verification')
    .add({ verification })
    .then(newGuest => {
      return firebase.firestore().runTransaction(transaction => {
        return transaction
          .get(this.eventListRef.doc(eventId))
          .then(eventDoc => {
            const newRevenue = eventDoc.data().revenue + eventPrice;
            transaction.update(this.eventListRef.doc(eventId), {
              revenue: newRevenue
            });
            if (guestPicture != null) {
              const storageRef = firebase
                .storage()
                .ref(`/guestProfile/${newGuest.id}/profilePicture.png`);

              return storageRef
                .putString(guestPicture, 'base64', {
                  contentType: 'image/png'
                })
                .then(() => {
                  return storageRef.getDownloadURL().then(downloadURL => {
                    return this.eventListRef
                      .doc(eventId)
                      .collection('verification')
                      .doc(newGuest.id)
                      .update({ profilePicture: downloadURL });
                  });
                });
            }
          });
      });
    });
  }
}