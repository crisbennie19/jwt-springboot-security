import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TransactionsComponent } from './views/transactions/transactions.component';
import { CreditComponent } from './views/credit/credit.component';
import { CreditRequestComponent } from './views/creditrequest/creditrequest.component';
import { SavingsComponent } from './views/savings/savings.component';
import { MessagesComponent } from './views/messages/messages.component';
import { ChargesComponent } from './views/charges/charges.component';
import { ReportsComponent } from './views/reports/reports.component';
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


const routes: Routes = [
  {
    path:'',
    component:LandingpageComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'interests',
    component:InterestsComponent
  },
  {
    path:'wallet',
    component:WalletsComponent
  },
  {
    path:'transactions',
    component:TransactionsComponent
  },
  {
    path:'creditrequests',
    component:CreditRequestComponent
  },
  {
    path:'credit',
    component:CreditComponent
  },
  {
    path:'savings',
    component:SavingsComponent
  },
  {
    path:'messages',
    component:MessagesComponent
  },
  {
    path:'settings',
    component:SettingsComponent
  },
  {
    path:'reports',
    component:ReportsComponent
  },
  {
    path:'logs',
    component:LogsComponent
  },
  {
    path:'withdrawal',
    component:WithdrawalComponent
  },
  {
    path:'referrals',
    component:ReferralComponent
  },
  {
    path:'users',
    component:UsersComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
