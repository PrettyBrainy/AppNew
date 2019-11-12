import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class BusinessesService {
  public businesses: firebase.firestore.CollectionReference;

  constructor() { }

  /*stuff for business sujestions */
  addBusiness(
    businessName: string,  
): Promise<void> {
  this.businesses = firebase
  .firestore()
  .collection('businessList');
    return this.businesses.add({ businessName }).then(ref => {
        console.log('Added document with ID');
      })
      
       } 
       
}