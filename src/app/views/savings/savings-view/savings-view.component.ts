import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-savings-view',
  templateUrl: './savings-view.component.html',
  styleUrls: ['./savings-view.component.scss']
})
export class SavingsViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
  private dialogRef: MatDialogRef<SavingsViewComponent>,
  ) { }

  ngOnInit() {
    
  }

  closeDialog(){
    this.dialogRef.close()
    event.preventDefault();
  }

}
