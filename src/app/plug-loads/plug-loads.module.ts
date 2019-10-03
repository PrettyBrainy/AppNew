import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlugLoadsPage } from './plug-loads.page';

const routes: Routes = [
  {
    path: '',
    component: PlugLoadsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlugLoadsPage]
})
export class PlugLoadsPageModule {}
