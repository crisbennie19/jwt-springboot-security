import { Injectable } from '@angular/core';
import { TransactionsService } from './api/transactions.service';
import { CardService } from './api/card.service';
import { CreditService } from './api/credit.service';
import { LogsService } from './api/logs.service';
import { DashboardService } from './api/dashboard.service';
import { MessageService } from './api/message.service';
import { ReferralService } from './api/referral.service';
import { SavingsService } from './api/savings.service';
import { UsersService } from './api/users.service';
import { ChargesService } from './api/charges.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { WalletService } from './api/wallet.service';
import { InterestsService } from './api/interests.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private loginAuth = new BehaviorSubject(false);
  isLoggedin = this.loginAuth.asObservable();

  constructor(
    public transactionService:TransactionsService,
    public chargesService:ChargesService,
    public cardService:CardService,
    public creditService:CreditService,
    public dashboardService:DashboardService,
    public logsService:LogsService,
    public messageService:MessageService,
    public referralService:ReferralService,
    public savingsService:SavingsService,
    public usersService: UsersService,
    public walletService: WalletService,
    public interestService:InterestsService,
    private router:Router,
    private location: Location,
    private snackBar:MatSnackBar

  ) { 
    // router.events.subscribe(val => {
    //   console.log(val['url'], "location");
      
    //   if (val['url'] == "/") {
    //     this.snackBar.open('Okay', "Dismiss", {duration:1000})         
    //   }
    //   else{
    //     this.idleLogout()            
    //   }
    // });

    this.checkLoginStatus()

    
    this.isLoggedin.subscribe( val => {
      if( val === true){    
        this.idleLogout()
      }
    })
  }

  loginUser( hasAccess: boolean){
    this.loginAuth.next(hasAccess)
  }

  idleLogout() {
    var time;
    var context = this
    var response = this.snackBar
    var route = this.router
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  // catches touchscreen presses as well      
    window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
    window.onclick = resetTimer;      // catches touchpad clicks as well
    window.onkeypress = resetTimer;   
    window.addEventListener('scroll', resetTimer, true); // improved; see comments

    function logout(){
      localStorage.clear();
      // response.open('Your session has expired', "Dismiss")
      route.navigate(['']);
      context.loginAuth.next(false);
    }

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(logout, 1000 * 60 * 20);  // time is in milliseconds
    }
  }

  setToken(data) {
    localStorage.setItem('token', data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkLoginStatus() {
    if (localStorage.getItem('adminUser') !== null) {
      this.loginAuth.next(true);
      // this.router.navigateByUrl('/dashboard');
    } else {
      this.logout();
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
    this.loginAuth.next(false);
  }
}
