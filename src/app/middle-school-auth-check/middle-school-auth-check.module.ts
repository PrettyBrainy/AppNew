import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiddleSchoolAuthCheckPage } from './middle-school-auth-check.page';

const routes: Routes = [
  {
    path: '',
    component: MiddleSchoolAuthCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiddleSchoolAuthCheckPage]
})
export class MiddleSchoolAuthCheckPageModule {}
