import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  pass: any;
  shown: boolean;
  loading: boolean;
  loginDetails = {
    username:'',
    password:''
  }
  isForgot = false;


  constructor(
    private formBuilder:FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar,
    private router: Router) { }

  SigninForm:FormGroup
  message:string = '';

  ngOnInit() {
    this.SigninForm = this.formBuilder.group({
      'email':['', Validators.required],
      'password':['', Validators.required]
    })
  }

  
  showPass(){
    this.pass = document.querySelector('#loginpassword');
    if(this.pass.type == "password"){
      this.pass.type = "text"
      this.shown = true
    }
    else{
      this.pass.type = "password"
      this.shown = false
    }
  }

  SignIn(){
    if(this.SigninForm.invalid){
      return
    }

    let form = this.SigninForm
    
    this.loginDetails.username = form.get('email').value;
    this.loginDetails.password = form.get('password').value;
    this.loading = true
    this.data.usersService.loginAdmin( this.loginDetails)
    .pipe(
      map(res => res)
    )
    .subscribe( res => { 
      if(res['message'] == 'Success: Authentication Completed'){
        localStorage.setItem('adminUser', JSON.stringify(res['data']))
        this.data.loginUser(true)
        this.router.navigate(['/dashboard']);
        this.loading = false
      }
      else{
        this.message = 'Incorrect username or password';
        this.loading = false;
      }
    },
    err => {
      this.loading = false;
      this.message = 'Error! Try again';
      this.snackBar.open("Can't connect to server! Check your network and try again","Dismiss",{
        duration:2500
      })
    })
  }
}
