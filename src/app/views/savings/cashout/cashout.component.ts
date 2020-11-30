import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { getDate } from 'src/app/helpers/dateFormat';
import { CashoutviewComponent } from './cashoutview/cashoutview.component';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.scss']
})
export class CashoutComponent implements OnInit {


  targetDate: any

  charges: boolean
  trans: boolean
  vcard: boolean
  wallet: boolean
  default: boolean
  savings: boolean
  error: boolean
  loading: boolean;
  tableLength: number;
  mydata: any = [];
  message: string
  searchKey: any = '';
  days: any
  displaysavings: boolean
  displaytargetsavings: boolean
  display3savings: boolean


  public listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displaySavingsColumn = ['accountname', 'accountphone', 'amount', 'interestamount', 'savingtype', 'startdate', 'action'];
  displayTargetColumn = ['accountname', 'accountphone', 'amount', 'interestamount', 'savingtype', 'startdate', 'total_amount', 'cashoutdate', 'action'];
  displayDaysColumn = ['accountname', 'accountphone', 'amount', 'interestamount', 'savingtype', 'startdate', 'total_amount', 'cashoutdate', 'action'];
  totalAmount: number = 0;



  constructor(private data: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    //this.getDailysavingsByDays();
    this.getDailysavings()

  }

  getDailysavings() {
    this.displaysavings = true
    this.display3savings = false
    this.displaytargetsavings = false
    this.loading = true;
    this.data.cashoutService.getDailySavings().subscribe((res: any) => {


      if (res.message == "Success") {
        this.mydata = res.data;
        this.computeTotalAmount(res['data'])
        this.loading = false;
        this.error = false
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;

      }
      else {
        this.message = res.message
        this.loading = false;
        this.error = true
      }
    }, err => {
      this.loading = false;
    })
  }

  getDailysavingsByDays() {
    this.displaysavings = false
    this.display3savings = true
    this.displaytargetsavings = false
    this.loading = true;
    this.data.cashoutService.getDailySavingsByDay(this.days).subscribe((res: any) => {

      if (res.message == "Success") {

        this.mydata = res.data;
        this.computeTotalAmount(res['data'])
        this.loading = false;
        this.error = false
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;
      }
      else {
        this.message = res.message
        this.loading = false;
        this.error = true
      }
    }, err => {
      this.loading = false;
    })
  } 


  computeTotalAmount(data){
    this.totalAmount = 0
    for (let i = 0; i < data.length; i++) {
      this.totalAmount += data[i].total_amount;
    }

    
  
  }

  getSavingsByDate() {
    this.displaysavings = false
    this.display3savings = false
    this.displaytargetsavings = true
    let dateTarget = getDate(this.targetDate)
    this.loading = true;
    this.data.cashoutService.getDailySavingsByDate(dateTarget).subscribe((res: any) => {


      if (res.message == "Success") {
        this.computeTotalAmount(res['data'])
        this.mydata = res.data;
        this.loading = false;
        this.error = false
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;

      }
      else {
        this.message = res.message
        this.loading = false;
        this.error = true
      }
    }, err => {
      this.loading = false;
    })
  }


  // getSavingsByDate(){
  //   this.data.cashoutService.getDailySavingsByDate("2020-10-29").subscribe((data:any)=>{
  // console.log(data)
  //   })
  // }

  applyFilter() {
    this.listData.filter = this.searchKey.toString();
    this.listData['accountid'].filter = this.searchKey.toString();

  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter()
  }
  viewSearch(row) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = row
    dialogConfig.minWidth = '60%'
    dialogConfig.maxHeight = '90vh'
    this.dialog.open(CashoutviewComponent, dialogConfig)
  }
} 
