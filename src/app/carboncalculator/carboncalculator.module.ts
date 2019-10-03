import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarboncalculatorPage } from './carboncalculator.page';

const routes: Routes = [
  {
    path: '',
    component: CarboncalculatorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarboncalculatorPage]
})
export class CarboncalculatorPageModule {}
