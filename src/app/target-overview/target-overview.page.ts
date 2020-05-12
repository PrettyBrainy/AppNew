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
    this.navCtrl.navigateForward('/education');
  }

  goToComputerPage()
  {
    this.navCtrl.navigateForward('/computers');
  }

  goToPlugLoadsPage()
  {
    this.navCtrl.navigateForward('/plug-loads');
  }

  goToAandRPage()
  {
    this.navCtrl.navigateForward('/appliances-and-recycling');
  }

  goToHeatingCoolingPage()
  {
    this.navCtrl.navigateForward('/heating-and-cooling');
  }

  goToLightingPage()
  {
    this.navCtrl.navigateForward('/lighting');
  }
  
  goToTransportationPage()
  {
    this.navCtrl.navigateForward('/transportation');
  }

}
