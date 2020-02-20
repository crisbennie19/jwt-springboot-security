import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-credit-account-statement',
  templateUrl: './credit-account-statement.component.html',
  styleUrls: ['./credit-account-statement.component.scss']
})
export class CreditAccountStatementComponent implements OnInit {

  page:number = 1;
  pdfSrc:string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  
   constructor(
    @Inject(MAT_DIALOG_DATA) private selectedRequest:any,
    private dialogRef: MatDialogRef<CreditAccountStatementComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    
  }

  



  closeDialog(){
    this.dialogRef.close();
    event.preventDefault();
  }

}

