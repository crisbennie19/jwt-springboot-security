import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-savings-balance-view',
  templateUrl: './savings-balance-view.component.html',
  styleUrls: ['./savings-balance-view.component.scss']
})
export class SavingsBalanceViewComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
  private dialogRef: MatDialogRef<SavingsBalanceViewComponent>,
  ) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close()
    event.preventDefault();
  }

}
