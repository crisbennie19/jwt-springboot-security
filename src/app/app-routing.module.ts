import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TransactionsComponent } from './views/transactions/transactions.component';
import { CreditComponent } from './views/credit/credit.component';
import { CreditRequestComponent } from './views/creditrequest/creditrequest.component';
import { SavingsComponent } from './views/savings/savings.component';
import { MessagesComponent } from './views/messages/messages.component';
import { ChargesComponent } from './views/charges/charges.component';
import { UsersListComponent } from './views/users/users-list/users-list.component';
import { UsersComponent } from './views/users/users.component';
import { LogsComponent } from './views/logs/logs.component';
import { WithdrawalComponent } from './views/withdrawal/withdrawal.component';
import { ReferralComponent } from './views/referral/referral.component';
import { LandingpageComponent } from './views/landingpage/landingpage.component';
import { WalletComponent } from './views/wallets/wallet/wallet.component';
import { InterestsComponent } from './views/interests/interests.component';
import { WalletsComponent } from './views/wallets/wallets.component';
import { SettingsComponent } from './views/settings/settings.component';
import { ReportsComponent } from './views/reports/reports.component';
import { SupportComponent } from './views/support/support.component';
import { ViewSupportComponent } from './views/support/view-support/view-support.component';
import { DebtcollectionComponent } from './views/debtcollection/debtcollection.component';
import { AccessGuard } from './guard/access.guard';


const routes: Routes = [
  {
    path:'',
    component:LandingpageComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","ACCOUNT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'interests',
    component:InterestsComponent,
    data:{
      allowedRoles:["ADMINISTRATOR"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'wallet',
    component:WalletsComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","ACCOUNT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'transactions',
    component:TransactionsComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","ACCOUNT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'creditrequests',
    component:CreditRequestComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","BANK"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'credit',
    component:CreditComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","BANK","ACCOUNT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'savings',
    component:SavingsComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","BANK","ACCOUNT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'messages',
    component:MessagesComponent,
    data:{
      allowedRoles:["ADMINISTRATOR"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'settings',
    component:SettingsComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","BANK"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'reports',
    component:ReportsComponent,
    data:{
      allowedRoles: ["ADMINISTRATOR","ACCOUNT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'logs',
    component:LogsComponent,
    data:{
      allowedRoles:["ADMINISTRATOR"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'withdrawal',
    component:WithdrawalComponent
  },
  {
    path:'referrals',
    component:ReferralComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","SUPPORT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'users',
    component:UsersComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","SUPPORT"]
    },
    canActivate:[AccessGuard]
  },
  {
    path:'support',
    component:SupportComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","SUPPORT"]
    },
    canActivate:[AccessGuard]
  },
  {path: 'issue-details/:id', 
    component: ViewSupportComponent,
    data:{
      allowedRoles:["ADMINISTRATOR","SUPPORT"]
    }
  },

  // {path: 'debtcollection', component: DebtcollectionComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top', useHash: false
   })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
