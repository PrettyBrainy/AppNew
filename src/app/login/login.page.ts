import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', 
    Validators.compose([Validators.required, Validators.email])], 
    password: [
      '', 
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
    })
   }

  ngOnInit() {
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
  
      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(async () => {
            this.router.navigateByUrl('/tabs/tab1');
            
              const alert = await this.alertCtrl.create({
                header: `COVID-19 Message`,
                cssClass: "scaledAlert",
                message: ` 
                <p> To Our Community — </p>
                 <p> As COVID-19 travels and spreads, the top priority of Team MISSion Innovation is for you to be safe, healthy, and comfortable while taking action for the climate. </p> 
                 <p> While using the MISSion Innovation App, you may discover new ways of completing the pledges within the guidelines of social distancing, stay-at-home orders, and quarantines. Be creative as you reduce your carbon footprint! Complete the pledges from home. As you venture out and complete pledges, be safe. </p> 
                 <p> Now is a prime time to take the personal actions that are Climate Action. As we have changed our behavior to minimize the risks from COVID-19, we are discovering that our new actions, including driving less and preparing our own food at home, are reducing our carbon footprint. Let’s sustain these actions. </p>
                 <p> Thank you for being part of this movement. Though practicing social distancing, WE ARE TOGETHER taking action for the climate. </p>
                 <p> Thank you for being safe. </p> 
                 <p> Sincerely, </p>
                 <p> The MISSion Innovation Leadership Team</p>`,
            
                buttons: ['Dismiss'],
              });
              alert.present();
              let result = await alert.onDidDismiss();
              console.log(result);
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
    }
  }
  
}
