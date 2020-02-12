import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-wallet-view',
  templateUrl: './wallet-view.component.html',
  styleUrls: ['./wallet-view.component.scss']
})
export class WalletViewComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
  private dialogRef: MatDialogRef<WalletViewComponent>,
  ) { }

  ngOnInit() {     
  }

  closeDialog(){
    this.dialogRef.close()
    event.preventDefault();
  }

}
