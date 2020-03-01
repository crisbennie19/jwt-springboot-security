import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../data.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  activeUser:any;
  dataService:DataService = null;

  
  menuList = [
    {route:'/dashboard',icon:'dashboard', name:'Dashboard'},
    {route:'/wallet',icon:'account_balance_wallet', name:'Wallet'},
    {route:'/transactions',icon:'compare_arrows', name:'Transactions'},
    // {route:'/charges',icon:'import_export', name:'Charges'},
    {route:'/interests',icon:'monetization_on', name:'Interests'},
    {route:'/messages',icon:'email', name:'Messages'},
    {route:'/users',icon:'account_box', name:'Users'},
    {route:'/credit',icon:'credit_card', name:'Credit'},
    {route:'/savings',icon:'save_alt', name:'Savings'},
    {route:'/logs',icon:'receipt', name:'Logs'},
    {route:'/referrals',icon:'insert_comment', name:'Referral'},

    {route:'/reports',icon:'report', name:'Report'},
    {route:'/settings',icon:'settings', name:'Settings'}
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private data:DataService) {
    this.activeUser = JSON.parse(localStorage.getItem('adminUser') )
  }

  collectDebt(){
    this.data.creditService.collectDebt();
    // console.log("it is working");
  }

  logout(){
    this.data.logout();
  }

}
