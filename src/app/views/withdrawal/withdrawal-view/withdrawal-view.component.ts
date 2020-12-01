import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaulterViewComponent } from '../../debtcollection/default-users/defaulter-view/defaulter-view.component';

@Component({
  selector: 'app-withdrawal-view',
  templateUrl: './withdrawal-view.component.html',
  styleUrls: ['./withdrawal-view.component.scss']
})
export class WithdrawalViewComponent implements OnInit {
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
@ViewChild(MatSort, { static: false }) sort: MatSort;  
list:any
public listData: MatTableDataSource<any>;

displayedColumns = ['accountname', 'accountphone',  'amount',  'walletbalance','channel','trandate'];
loading: boolean;
  tableLength: number;
  constructor(@Inject(MAT_DIALOG_DATA) public selectedRow: any,
  private dialogRef : MatDialogRef<WithdrawalViewComponent>,
  
  ) { }

  ngOnInit() {
    this.list = JSON.parse(this.selectedRow)
    
    this.listData = new MatTableDataSource(this.list )
   
      }

  closeDialog(){
   this.dialogRef.close()
  }
}
