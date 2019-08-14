import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {

  listData: MatTableDataSource<{}>;

  fromdate = '';
  todate = '';

  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','accname','accno','bank', 'amount','date','status'];

  dataSource = [
    {accountname:"Regina Emmanuel", accountnumber:"0016266744", amount:30000,
    date:"May 7, 2019", status:'pending',bank:'Zenith bank', description:"Payment of books"},
    {accountname:"Regina Emmanuel", accountnumber:"0016266744", amount:30000,
    date:"May 7, 2019", status:'pending',bank:'Zenith bank', description:"Payment of books"},
    {accountname:"Regina Emmanuel", accountnumber:"0016266744", amount:30000,
    date:"May 7, 2019", status:'pending',bank:'Zenith bank', description:"Payment of books"},
    {accountname:"Regina Emmanuel", accountnumber:"0016266744", amount:30000,
    date:"May 7, 2019", status:'pending',bank:'Zenith bank', description:"Payment of books"},
    {accountname:"Regina Emmanuel", accountnumber:"0016266744", amount:30000,
    date:"May 7, 2019", status:'pending',bank:'Zenith bank', description:"Payment of books"},
    {accountname:"Regina Emmanuel", accountnumber:"0016266744", amount:30000,
    date:"May 7, 2019", status:'pending',bank:'Zenith bank', description:"Payment of books"},
    {accountname:"Regina Emmanuel", accountnumber:"0016266744", amount:30000,
    date:"May 7, 2019", status:'pending',bank:'Zenith bank', description:"Payment of books"},
  ];


  constructor() { }

  ngOnInit() {
    this.listData = new MatTableDataSource(this.dataSource);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  
  filterSearch(){

  }
}
