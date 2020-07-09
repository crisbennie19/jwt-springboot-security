import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cashoutview',
  templateUrl: './cashoutview.component.html',
  styleUrls: ['./cashoutview.component.scss']
})
export class CashoutviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
  private dialogRef: MatDialogRef<CashoutviewComponent>,
  ) { }
 
  ngOnInit() { 
    console.log(this.selectedRow,"view")
  }

  closeDialog(){
    this.dialogRef.close()
    event.preventDefault();
  }


}
