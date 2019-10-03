import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-carboncalculator',
  templateUrl: './carboncalculator.page.html',
  styleUrls: ['./carboncalculator.page.scss'],
})

export class CarboncalculatorPage implements OnInit {

  public fuelEcon: number; 
  public milesDriven: number;
  public bulbs: number;
  public change: number;
  public hours: number;
  public showResults: boolean = true;

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  btnClick(){
    this.showResults=false;
  }

  formatRounding(rounded){
    return rounded.toFixed(2);
  }

}