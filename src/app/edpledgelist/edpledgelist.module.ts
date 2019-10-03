import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EdpledgelistPage } from './edpledgelist.page';

const routes: Routes = [
  {
    path: '',
    component: EdpledgelistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EdpledgelistPage]
})
export class EdpledgelistPageModule {}
