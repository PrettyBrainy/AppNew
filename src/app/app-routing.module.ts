import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard'
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
 
  { path: '', 
    loadChildren: './welcome/welcome1/welcome1.module#Welcome1PageModule', 
    //canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },

  { path: 'education', loadChildren: './education/education.module#EducationPageModule'},
  { path: 'computers', loadChildren: './computers/computers.module#ComputersPageModule' },
  { path: 'plug-loads', loadChildren: './plug-loads/plug-loads.module#PlugLoadsPageModule' },
  { path: 'equipment-and-purchasing', loadChildren: './equipment-and-purchasing/equipment-and-purchasing.module#EquipmentAndPurchasingPageModule' },
  { path: 'ed1', loadChildren: './ed1/ed1.module#Ed1PageModule' },
  { path: 'ed2', loadChildren: './ed2/ed2.module#Ed2PageModule' },
  { path: 'ed3', loadChildren: './ed3/ed3.module#Ed3PageModule' },
  { path: 'ed4', loadChildren: './ed4/ed4.module#Ed4PageModule' },
  { path: 'ed5', loadChildren: './ed5/ed5.module#Ed5PageModule' },
  { path: 'verify-text', loadChildren: './verify-text/verify-text.module#VerifyTextPageModule' },
  { path: 'target-overview', loadChildren: './target-overview/target-overview.module#TargetOverviewPageModule' },
  { path: 'middle-school-auth-check', loadChildren: './middle-school-auth-check/middle-school-auth-check.module#MiddleSchoolAuthCheckPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'overview', loadChildren: './overview/overview.module#OverviewPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: 'welcome1', loadChildren: './welcome/welcome1/welcome1.module#Welcome1PageModule' },
  { path: 'welcome2', loadChildren: './welcome/welcome2/welcome2.module#Welcome2PageModule' },
  { path: 'edpledgelist', loadChildren: './edpledgelist/edpledgelist.module#EdpledgelistPageModule' },
  { path: 'ed-pledge-detail/:id', 
    loadChildren: './ed-pledge-detail/ed-pledge-detail.module#EdPledgeDetailPageModule', 
    canActivate: [AuthGuard]},
  { path: 'welcome3', loadChildren: './welcome/welcome3/welcome3.module#Welcome3PageModule' },
  { path: 'welcome4', loadChildren: './welcome/welcome4/welcome4.module#Welcome4PageModule' },
  { path: 'comingsoon', loadChildren: './comingsoon/comingsoon.module#ComingsoonPageModule' },
  { path: 'carboncalculator', loadChildren: './carboncalculator/carboncalculator.module#CarboncalculatorPageModule' },
  { path: 'create-event', loadChildren: './create-event/create-event.module#CreateEventPageModule' },
  { path: 'leaderboard', loadChildren: './leaderboard/leaderboard.module#LeaderboardPageModule' },
  { path: 'ed1docs', loadChildren: './educationdocuments/ed1docs/ed1docs.module#Ed1docsPageModule' },
  { path: 'ed2docs', loadChildren: './educationdocuments/ed2docs/ed2docs.module#Ed2docsPageModule' },
  { path: 'ed3docs', loadChildren: './educationdocuments/ed3docs/ed3docs.module#Ed3docsPageModule' },
  { path: 'pl1', loadChildren: './plug-loads/pl1/pl1.module#Pl1PageModule' },
  { path: 'pl2', loadChildren: './plug-loads/pl2/pl2.module#Pl2PageModule' },
  { path: 'pl3', loadChildren: './plug-loads/pl3/pl3.module#Pl3PageModule' },
  { path: 'pl4', loadChildren: './plug-loads/pl4/pl4.module#Pl4PageModule' },
  { path: 'pl5', loadChildren: './plug-loads/pl5/pl5.module#Pl5PageModule' },
  { path: 'lighting', loadChildren: './lighting/lighting.module#LightingPageModule' },
  { path: 'l1', loadChildren: './lighting/l1/l1.module#L1PageModule' },
  { path: 'l2', loadChildren: './lighting/l2/l2.module#L2PageModule' },
  { path: 'l3', loadChildren: './lighting/l3/l3.module#L3PageModule' },
  { path: 'pl-document', loadChildren: './pl-document/pl-document.module#PlDocumentPageModule' },
  { path: 'c1', loadChildren: './computers/c1/c1.module#C1PageModule' },
  { path: 'c2', loadChildren: './computers/c2/c2.module#C2PageModule' },
  { path: 'c3', loadChildren: './computers/c3/c3.module#C3PageModule' },
  { path: 'appliances-and-recycling', loadChildren: './appliances-and-recycling/appliances-and-recycling.module#AppliancesAndRecyclingPageModule' },
  { path: 'ar1', loadChildren: './appliances-and-recycling/ar1/ar1.module#Ar1PageModule' },
  { path: 'ar3', loadChildren: './appliances-and-recycling/ar3/ar3.module#Ar3PageModule' },
  { path: 'ar2', loadChildren: './appliances-and-recycling/ar2/ar2.module#Ar2PageModule' },
  { path: 'ar4', loadChildren: './appliances-and-recycling/ar4/ar4.module#Ar4PageModule' },
  { path: 'ar5', loadChildren: './appliances-and-recycling/ar5/ar5.module#Ar5PageModule' }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
