import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { verifyRole } from '../helpers/roles';
import { ChangePasswordComponent } from '../views/users/change-password/change-password.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  activeUser:any;
  dataService:DataService = null;

  
  menuList = [
    {route:'/dashboard',icon:'dashboard', name:'Dashboard', role:"ADMINISTRATOR"},
    {route:'/wallet',icon:'account_balance_wallet', name:'Wallet', role:"ADMINISTRATOR"},
    {route:'/transactions',icon:'compare_arrows', name:'Transactions', role:"ADMINISTRATOR"},
    // {route:'/charges',icon:'import_export', name:'Charges'},
    {route:'/interests',icon:'monetization_on', name:'Interests', role:"ADMINISTRATOR"},
    {route:'/messages',icon:'email', name:'Messages', role:"ADMINISTRATOR"},
    {route:'/users',icon:'account_box', name:'Users', role:"ADMINISTRATOR"},
    {route:'/credit',icon:'credit_card', name:'Credit', role:"BANK"},
    {route:'/savings',icon:'save_alt', name:'Savings', role:"BANK"},
    {route:'/logs',icon:'receipt', name:'Logs', role:"ADMINISTRATOR"},
    {route:'/referrals',icon:'insert_comment', name:'Referral', role:"ADMINISTRATOR"},
    {route:'/reports',icon:'report', name:'Report', role:"ADMINISTRATOR"},
    {route:'/settings',icon:'settings', name:'Settings', role:"BANK"}
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isBank: any;

  constructor(private breakpointObserver: BreakpointObserver, 
    private data:DataService, private dialog:MatDialog) {
    this.activeUser = JSON.parse(localStorage.getItem('adminUser') )

    this.isBank = verifyRole('BANK')
  }

  getInitials(string) {
    var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  collectDebt(){
    this.data.creditService.collectDebt();
    // console.log("it is working");
  }

  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "30%";
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

  logout(){
    this.data.logout();
  }

}
