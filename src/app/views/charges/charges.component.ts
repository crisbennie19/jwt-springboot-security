import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss']
})
export class ChargesComponent implements OnInit {
  listData: MatTableDataSource<{}>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','channel','type','account', 'amount','date','charges'];

  dataSource = [
    {accountholder:"Regina Emmanuel", amount:30000,date:"May 7, 2019", charges:'53', 
    type:"payment", channel:"Card", description:"Payment of books"},
    {accountholder:"Regina Emmanuel", amount:30000,date:"May 7, 2019", charges:'53', 
    type:"payment", channel:"Card", description:"Payment of books"},
    {accountholder:"Regina Emmanuel", amount:30000,date:"May 7, 2019", charges:'53', 
    type:"payment", channel:"Card", description:"Payment of books"},
    {accountholder:"Regina Emmanuel", amount:30000,date:"May 7, 2019", charges:'53', 
    type:"payment", channel:"Card", description:"Payment of books"},
    {accountholder:"Regina Emmanuel", amount:30000,date:"May 7, 2019", charges:'53', 
    type:"payment", channel:"Card", description:"Payment of books"},
    {accountholder:"Regina Emmanuel", amount:30000,date:"May 7, 2019", charges:'53', 
    type:"payment", channel:"Card", description:"Payment of books"},
    {accountholder:"Regina Emmanuel", amount:30000,date:"May 7, 2019", charges:'53', 
    type:"payment", channel:"Card", description:"Payment of books"},
  ];


  constructor() { }

  ngOnInit() {
    this.listData = new MatTableDataSource(this.dataSource);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
}
