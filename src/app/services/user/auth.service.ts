import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { async } from 'q';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  getUser(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            resolve(user);
          } else {
            reject(null);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  loginUser(
    email: string, 
    password: string
  ): Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
    
  
  signupUser(
    email: string,
    password: string
  ): Promise<any> {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((newUserCredential: firebase.auth.UserCredential) =>{
      firebase
      .firestore()
      .doc(`/userProfile/${newUserCredential.user.uid}`)
      .set({ email });
    })
  
    .catch(error =>{
      console.error(error);
      throw new Error(error);
    })
  
  }
  
  resetPassword(
    email: string
  ): Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }
  
  logoutUser(): Promise<void>{
    return firebase.auth().signOut();
  }
  
}



