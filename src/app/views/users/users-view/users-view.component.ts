import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material'

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
    private dialogRef: MatDialogRef<UsersViewComponent>
  ) { }

  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close()
    event.preventDefault()
  }

}
