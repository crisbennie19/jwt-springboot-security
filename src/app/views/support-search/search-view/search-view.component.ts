import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
  private dialogRef: MatDialogRef<SearchViewComponent>,
  ) { }

  ngOnInit() { 
    console.log(this.selectedRow.data)
  }

  closeDialog(){
    this.dialogRef.close()
    event.preventDefault();
  }


}
