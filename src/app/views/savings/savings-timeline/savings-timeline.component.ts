import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SavingsViewComponent } from '../savings-view/savings-view.component';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-savings-timeline',
  templateUrl: './savings-timeline.component.html',
  styleUrls: ['./savings-timeline.component.scss']
})
export class SavingsTimelineComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  displayedColumns = ['channel', 'amount', 'interestrate', 'interestamount', 'date'];
  public listData: MatTableDataSource<any>;
response:any
tableLength: number;
loading: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
  private dialogRef: MatDialogRef<SavingsViewComponent>,
  private data: DataService,
  private snackBar: MatSnackBar,
  private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getSavingsTimeline()
  }
getSavingsTimeline(){
  this.data.savingsService.getSavingsTimeline(this.selectedRow.id).subscribe((res:any)=>{
    this.response = res.data;
    this.loading = false;
      this.tableLength = this.response.length
      this.listData = new MatTableDataSource(this.response);        
  }
  , err => {
    this.loading = false;
  
  })
  
}

  closeDialog(){
    this.dialogRef.close()
    event.preventDefault();
  }


}
