import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-target-overview',
  templateUrl: './target-overview.page.html',
  styleUrls: ['./target-overview.page.scss'],
})
export class TargetOverviewPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) {
  
   }

  ngOnInit() {
  }

  goToEdPage()
  {
    this.navCtrl.navigateForward('/edpledgelist');
  }

  goToComputerPage()
  {
    this.navCtrl.navigateForward('/comingsoon');
  }

  goToPlugLoadsPage()
  {
    this.navCtrl.navigateForward('/comingsoon');
  }

  goToEandPPage()
  {
    this.navCtrl.navigateForward('/comingsoon');
  }

  goToHeatingCoolingPage()
  {
    this.navCtrl.navigateForward('/comingsoon');
  }

  goToLightingPage()
  {
    this.navCtrl.navigateForward('/comingsoon');
  }
  
  goToTransportationPage()
  {
    this.navCtrl.navigateForward('/comingsoon');
  }

}
