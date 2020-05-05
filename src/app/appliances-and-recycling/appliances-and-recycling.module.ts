import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppliancesAndRecyclingPage } from './appliances-and-recycling.page';

import { NgCircleProgressModule } from 'ng-circle-progress';


const routes: Routes = [
  {
    path: '',
    component: AppliancesAndRecyclingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      showBackground: false
     })
  ],
  declarations: [AppliancesAndRecyclingPage]
})
export class AppliancesAndRecyclingPageModule {}
