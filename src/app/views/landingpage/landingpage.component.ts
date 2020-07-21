import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { menuList } from 'src/app/helpers/roles';

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

  year = new Date().getFullYear()

  menuList = menuList.menu
  authorizedMenu: { route: string; icon: string; name: string; role: string[]; }[];
  activeUser: any;


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

  checkRole(user){
    // this.activser = JSON.parse(localStorage.getItem('adminUser') )

    
    this.authorizedMenu = this.menuList.filter( el => {
      return user.data.roles.some( (role) => el.role.includes(role))
    });
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
        let activeUser = JSON.parse(localStorage.getItem('adminUser') )
        let isBank;

        this.checkRole(activeUser)

        this.data.setToken(res['data'].tokendata.access_token);
        this.data.loginUser(true)

        this.router.navigate([this.authorizedMenu[0].route]);

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
      // this.snackBar.open("Can't connect to server! Check your network and try again","Dismiss",{
      //   duration:2500
      // })
    })
  }
}
