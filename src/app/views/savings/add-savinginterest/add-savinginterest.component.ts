import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar, MatDialogRef } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-savinginterest',
  templateUrl: './add-savinginterest.component.html',
  styleUrls: ['./add-savinginterest.component.scss']
})
export class AddSavinginterestComponent implements OnInit {

  public addInterestForm:FormGroup;
  
  newInterest = {
    active: false,
    datecreated:'',
    rate: 0,
    savingtype: {
      id: 0
    }
  }
  loading: boolean;
  tableLength: any;
  listData: any;
  savingsType: any;

  constructor(
    private dialogRef: MatDialogRef<AddSavinginterestComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {

    this.getTypeList();
    this.addInterestForm = this.formBuilder.group({
      'savingstype':[0, Validators.required],
      'rate':[0, Validators.required],
      'datecreated':['', Validators.required],
      'active':['']
    })
  }

  saveInterest(){
    if(this.addInterestForm.invalid){
      return;
    }
    this.loading = true;

    let form = this.addInterestForm
    this.newInterest.savingtype.id = form.get('savingstype').value;
    this.newInterest.rate = form.get('rate').value;
    this.newInterest.active = form.get('active').value;
    this.newInterest.datecreated = form.get('datecreated').value;

    this.data.savingsService.createUpdateSavingsInterest(this.newInterest)
    .subscribe( () => {
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open("New Interest Added", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.dialogRef.close();
      // this.snackBar.open("Error adding interest, try again","Dismiss",{
      //   duration:2000
      // })
    })
  }

  closeDialog(){
    this.dialogRef.close();
    event.preventDefault();
  }

  getTypeList(){
    this.loading = true;
    this.data.savingsService.getSavingsType()
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.loading = false;
      this.savingsType = res
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }

}
