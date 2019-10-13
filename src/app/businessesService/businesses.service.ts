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
    suggestionId: string, 
): Promise<void> {
  this.businesses = firebase
  .firestore()
  .collection('businessList');

    return this.businesses
      .doc(suggestionId)
      .collection('businessList')
      .add({ businessName })
      .then(newBusiness => {
        return firebase.firestore().runTransaction(transaction => {
          return transaction
            .get(this.businesses.doc(suggestionId))
            .then(eventDoc => {
              const newRevenue = eventDoc.data().revenue;
              transaction.update(this.businesses.doc(suggestionId), {
                revenue: newRevenue
              });
            })
          })
        })
       } 
}
