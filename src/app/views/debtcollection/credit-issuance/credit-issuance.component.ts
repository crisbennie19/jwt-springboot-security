import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { getFirstDayMonth, getDate } from 'src/app/helpers/dateFormat';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-issuance',
  templateUrl: './credit-issuance.component.html',
  styleUrls: ['./credit-issuance.component.scss']
})
export class CreditIssuanceComponent implements OnInit {

  public listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  message: string = "Please choose a date range to search "
  searchKey: any = '';
  displayedColumns = ['accountname','email','phone', 'trandate','amount'];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate = getFirstDayMonth(new Date())
  todate = getDate(new Date())
  response: any;



  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.getInitList()
  }
  getInitList() {
   
    this.loading = true
    this.data.creditIssuance.getCreditIssuance(0,10000)
    .subscribe((res: any) => {
     
      if (res.message == "Success") {
        
        this.mydata = res.data;
        this.loading = false;
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        console.log(this.listData)
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;
      }
      else {
         this.message = res.message
         this.loading = false;
       }
    }, err => {
      this.loading = false;
    })
  }
  applyFilter() {
    this.listData.filter = this.searchKey.toString();
    this.listData.filter = this.searchKey.toString();

  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter()
  }
}
