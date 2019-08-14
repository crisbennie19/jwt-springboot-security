import { Component, OnInit, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-edit-savinginterest',
  templateUrl: './edit-savinginterest.component.html',
  styleUrls: ['./edit-savinginterest.component.scss']
})
export class EditSavinginterestComponent implements OnInit {

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
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
    private dialogRef: MatDialogRef<EditSavinginterestComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
  
    this.getTypeList();
    this.addInterestForm = this.formBuilder.group({
      'savingstype':[this.selectedRow.savingtype.id, Validators.required],
      'rate':[this.selectedRow.rate, Validators.required],
      'datecreated':[this.selectedRow.datecreated, Validators.required],
      'active':[this.selectedRow.active]
    })
  }

  saveInterest(){
    if(this.addInterestForm.invalid){
      return;
    }
    this.loading = true;

    let form = this.addInterestForm
    this.selectedRow.savingtype.id = form.get('savingstype').value;
    this.selectedRow.rate = form.get('rate').value;
    this.selectedRow.active = form.get('active').value;
    this.selectedRow.datecreated = form.get('datecreated').value;

    this.data.savingsService.createUpdateSavingsInterest(this.selectedRow)
    .subscribe( () => {
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open("Savings interest Edited", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.dialogRef.close();
      // this.snackBar.open("Error editing interest, try again","Dismiss",{
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