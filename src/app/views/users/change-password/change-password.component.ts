import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm:FormGroup
  loading: boolean;
  newPassword = {
    newpassword:'',
    password:'',
    accountid:''
  }
  
  error: any;

  constructor(private data:DataService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      'oldpass':['', Validators.required],
      'newpass':['', Validators.required],
    })
  }

  changePassword(){
    if(this.changePasswordForm.invalid){
      return;
    }

    let activeUser = JSON.parse(localStorage.getItem('adminUser') )
    
    let form = this.changePasswordForm
    this.loading = true;

    let newpassword = form.get('newpass').value
    let password = form.get('oldpass').value
    let accountid = activeUser.data.id

    this.data.usersService.changePassword(accountid,newpassword,password, {})
    .subscribe( res => {
      if(res['message'] == "Success"){
        this.loading = true;
        this.dialog.closeAll();
        this.snackBar.open('Password change successful', 'Dismiss', {
          duration:3000
        })
      }
      else{
        this.loading = false;
        this.error = res['data']
      }
    }, err => {
      this.loading = false;
      this.dialog.closeAll();
      this.snackBar.open('Internal server error', 'Dismiss', {
        duration:3000
      })
    })
  }

  closeModal(){
    this.dialog.closeAll();
    event.preventDefault();
  }


}
