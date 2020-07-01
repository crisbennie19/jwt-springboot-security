import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-defaulter-view',
  templateUrl: './defaulter-view.component.html',
  styleUrls: ['./defaulter-view.component.scss']
})
export class DefaulterViewComponent implements OnInit {
  
 
  constructor(@Inject(MAT_DIALOG_DATA) public selectedRow: any,
  private dialogRef : MatDialogRef<DefaulterViewComponent>,
  
  ) { }

  ngOnInit() {
    console.log(this.selectedRow)
  }

  closeDialog(){
   this.dialogRef.close()
  }
}
