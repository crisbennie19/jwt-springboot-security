import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-credit-account-statement',
  // templateUrl: './credit-account-statement.component.html',
  template:`
  <mat-dialog-content>
  <pdf-viewer
  [src]="pdfSrc"
  [render-text]="true"
  [page]="page"
  [show-all]="true"
  style="display: block;">
  
  </pdf-viewer>
</mat-dialog-content>
<mat-dialog-actions class="dialog-footer">
  <button mat-button mat-dialog-close mat-raised-button color="primary">Back</button>
</mat-dialog-actions>
  `,
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
