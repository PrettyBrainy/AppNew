import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/user/auth.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public loading: any;
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(8), Validators.required]),
      ],
    });
  }

  ngOnInit() {}

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
  
      this.authService.signupUser(email, password).then(
        () => {
          this.loading.dismiss().then(async () => {
            this.router.navigateByUrl('/tabs/tab1');

              const alert = await this.alertController.create({
                header: 'Please fill out your profile',
                message: 'Fill in your profile information so you can begin your journey.',
                buttons: [
                  {
                   text: 'OK',
                   handler: () => {
                     this.navCtrl.navigateForward('/profile');
                   }
                  }],
              });
            
              await alert.present();
              let result = await alert.onDidDismiss();
              console.log(result);
            }
          );
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
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }
}
