import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LabgraphpicsPage } from './labgraphpics.page';

const routes: Routes = [
  {
    path: '',
    component: LabgraphpicsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LabgraphpicsPage]
})
export class LabgraphpicsPageModule {}
