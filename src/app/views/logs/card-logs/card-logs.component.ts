import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-card-logs',
  templateUrl: './card-logs.component.html',
  styleUrls: ['./card-logs.component.scss']
})
export class CardLogsComponent implements OnInit {
  listData: MatTableDataSource<{}>;

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fullname','account','email','phone', 'status','action'];

  dataSource = [
    {accountnumber:"0933455334", fullname:"Kelvin Joshua", 
    email:"Kelv834@gmail.com", phone:"08144257722", status:"Inactive" },
    {accountnumber:"0933455334", fullname:"Kelvin Joshua", 
    email:"Kelv834@gmail.com", phone:"08144257722", status:"Inactive" },
    {accountnumber:"0933455334", fullname:"Kelvin Joshua", 
    email:"Kelv834@gmail.com", phone:"08144257722", status:"Inactive" },
    {accountnumber:"0933455334", fullname:"Kelvin Joshua", 
    email:"Kelv834@gmail.com", phone:"08144257722", status:"Inactive" },
    {accountnumber:"0933455334", fullname:"Kelvin Joshua", 
    email:"Kelv834@gmail.com", phone:"08144257722", status:"Inactive" },
    {accountnumber:"0933455334", fullname:"Kelvin Joshua", 
    email:"Kelv834@gmail.com", phone:"08144257722", status:"Inactive" },
    {accountnumber:"0933455334", fullname:"Kelvin Joshua", 
    email:"Kelv834@gmail.com", phone:"08144257722", status:"Inactive" },
  ];


  constructor() { }

  ngOnInit() {
    this.listData = new MatTableDataSource(this.dataSource);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
}

