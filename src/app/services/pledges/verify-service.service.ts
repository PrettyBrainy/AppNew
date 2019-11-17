import { Router } from '@angular/router';
import { AuthService } from './../user/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class VerifyServiceService {

  constructor(private authService: AuthService,
              private router: Router) { }

getCurrent(){
  let view = this.router.url;
  let id = view.substr(1);
  console.log("This page is called " + id);
}

verifyText( id: string){

}

}
