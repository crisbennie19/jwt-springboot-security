import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';
import { verifyRole } from '../helpers/roles';
import { ChangePasswordComponent } from '../views/users/change-password/change-password.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  activeUser:any;
  dataService:DataService = null;

  
  menuList = [
    {route:'/dashboard',icon:'dashboard', name:'Dashboard', role:["ADMINISTRATOR","FINANCE"]},
    {route:'/wallet',icon:'account_balance_wallet', name:'Wallet', role:["ADMINISTRATOR"]},
    {route:'/transactions',icon:'compare_arrows', name:'Transactions', role:["ADMINISTRATOR","FINANCE"]},
    // {route:'/charges',icon:'import_export', name:'Charges'},
    {route:'/interests',icon:'monetization_on', name:'Interests', role:["ADMINISTRATOR"]},
    {route:'/messages',icon:'email', name:'Messages', role:["ADMINISTRATOR"]},
    {route:'/users',icon:'account_box', name:'Users', role:["ADMINISTRATOR","SUPPORT"]},
    {route:'/credit',icon:'credit_card', name:'Credit', role:["ADMINISTRATOR","BANK","FINANCE"]},
    {route:'/savings',icon:'save_alt', name:'Savings', role:["ADMINISTRATOR","BANK","FINANCE"]},
    {route:'/logs',icon:'receipt', name:'Logs', role:["ADMINISTRATOR"]},
    {route:'/referrals',icon:'insert_comment', name:'Referral', role:["ADMINISTRATOR"]},
    {route:'/reports',icon:'report', name:'Report', role:["ADMINISTRATOR"]},
    {route:'/support',icon:'live_help', name:'Support', role:["ADMINISTRATOR","SUPPORT"]},
    {route:'/settings',icon:'settings', name:'Settings', role:["ADMINISTRATOR","BANK"]}
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isBank: any;
  authorizedMenu: { route: string; icon: string; name: string; role: string[]; }[];
  isFinance: any;
  isSupport: any;
  isAdmin: any;

  constructor(private breakpointObserver: BreakpointObserver, 
    private router: Router,
    private data:DataService, private dialog:MatDialog) {
    this.activeUser = JSON.parse(localStorage.getItem('adminUser') )

    console.log(this.activeUser.data.roles, 'user roles');
    
    this.authorizedMenu = this.menuList.filter( el => {
      return this.activeUser.data.roles.some( (role) => el.role.includes(role))
    });
    
    this.isBank = verifyRole('BANK')
    this.isAdmin = verifyRole('ADMINISTRATOR')
    this.isSupport = verifyRole('SUPPORT')
    this.isFinance = verifyRole('FINANCE')

    console.log(this.isFinance,'this.isFinance');
    console.log(this.isBank,'this.isBank');
    console.log(this.isSupport,'this.isSupport');
    
  }


  accessMenu(value){
    this.menuList

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
    this.router.navigate(['/debtcollection'])
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
