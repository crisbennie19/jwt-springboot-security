import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar, MatDialogRef } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-add-savingtype',
  templateUrl: './add-savingtype.component.html',
  styleUrls: ['./add-savingtype.component.scss']
})
export class AddSavingtypeComponent implements OnInit {

  public addTypeForm:FormGroup;
  
  newType = {
    name:'',
    minday:0,
    maxday:0,
    points: 0
  }

  loading: boolean;
  tableLength: any;
  listData: any;
  savingsType: any;

  constructor(
    private dialogRef: MatDialogRef<AddSavingtypeComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.addTypeForm = this.formBuilder.group({
      'name':['', Validators.required],
      'minday':[0, Validators.required],
      'maxday':[0, Validators.required],
      'point':[0, Validators.required]
    })
  }

  saveType(){
    if(this.addTypeForm.invalid){
      return;
    }
    this.loading = true;

    let form = this.addTypeForm
    this.newType.name = form.get('name').value;
    this.newType.minday = form.get('minday').value;
    this.newType.maxday = form.get('maxday').value;
    this.newType.points = form.get('point').value;

    this.data.savingsService.createUpdateSavingsType(this.newType)
    .subscribe( () => {
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open("New Savings type Added", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error adding savings type, try again","Dismiss",{
        duration:2000
      })
    })
  }

  closeDialog(){
    this.dialogRef.close();
    event.preventDefault();
  }

}
