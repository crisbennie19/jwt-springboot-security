import { Component, OnInit, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-edit-savingtype',
  templateUrl: './edit-savingtype.component.html',
  styleUrls: ['./edit-savingtype.component.scss']
})
export class EditSavingtypeComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
    private dialogRef: MatDialogRef<EditSavingtypeComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.addTypeForm = this.formBuilder.group({
      'name':[this.selectedRow.name, Validators.required],
      'minday':[this.selectedRow.minday, Validators.required],
      'maxday':[this.selectedRow.maxday, Validators.required],
      'point':[this.selectedRow.points, Validators.required]
    })
  }

  saveType(){
    if(this.addTypeForm.invalid){
      return;
    }
    this.loading = true;

    let form = this.addTypeForm
    this.selectedRow.name = form.get('name').value;
    this.selectedRow.minday = form.get('minday').value;
    this.selectedRow.maxday = form.get('maxday').value;
    this.selectedRow.points = form.get('point').value;

    this.data.savingsService.createUpdateSavingsType(this.selectedRow)
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