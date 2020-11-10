import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import * as moment from 'moment';
import { downloadFilePDF, downloadFileEXCEL } from 'src/app/helpers/download-service';
import { ReportmailsendComponent } from '../reportmailsend/reportmailsend.component';



@Component({
  selector: 'app-interest-report',
  templateUrl: './interest-report.component.html',
  styleUrls: ['./interest-report.component.scss']
})
export class InterestReportComponent implements OnInit {

  public listData: MatTableDataSource<any>;

  searchKey: any = ''; // left search box model 

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['card', 'sunday', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'];

  displayedColumnsWeekly = ['name', 'week1', 'week2', 'week3', 'week4', 'week5', 'status'];

  displayedColumnsQuarterly = ['name', 'channel', 'q1', 'q2', 'q3', 'q4', 'status'];

  displayedColumnsYearly = ['name', 'date', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate: Date;
  todate: Date;
  response: any;
  reportOption: string
  daily: boolean 
  weekly: boolean
  quartely: boolean
  yearly: boolean
  y: any;
  m: any
  startquarter: string
  endquarter: string
  errorMessage: string
  invalidMsg: string
  invalid: boolean
  dataList:boolean
  download:string

  public months = [
    { name: 'January', last: '31', id: 1, month: '01' },
    { name: 'Febuary', last: '28', id: 2, month: '02' },
    { name: 'March', last: '31', id: 3, month: '03' },
    { name: 'April', last: '30', id: 4, month: '04' },
    { name: 'May', last: '31', id: 5, month: '05' },
    { name: 'June', last: '30', id: 6, month: '06' },
    { name: 'July', last: '31', id: 7, month: '07' },
    { name: 'August', last: '31', id: 8, month: '08' },
    { name: 'September', last: '30', id: 9, month: '09' },
    { name: 'October', last: '31', id: 10, month: '10' },
    { name: 'November', last: '30', id: 11, month: '11' },
    { name: 'December', last: '31', id: 12, month: '12' }
  ]
  public years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021
    , 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  currentYear = new Date().getFullYear()

  constructor(private data: DataService, private snackBar: MatSnackBar, private dialog:MatDialog) { }

  ngOnInit() {
    // this.getDailyReportList();
  }



  reportOptionSelector(value) {
    if (value == "daily") { this.daily = true; this.weekly = false; this.quartely = false; this.yearly = false; this.invalid = false; this.listData = new MatTableDataSource([]);this.dataList =false; this.download ="daily" }
    else if (value == "weekly") { this.daily = false; this.weekly = true; this.quartely = false; this.yearly = false; this.m = ''; this.y = ''; this.invalid = false; this.listData = new MatTableDataSource([]) ;this.dataList =false;this.download ="weekly" }
    else if (value == "quartely") { this.daily = false; this.weekly = false; this.quartely = true; this.yearly = false; this.y = ''; this.invalid = false; this.listData = new MatTableDataSource([]);this.dataList =false ;this.download ="quartely" }
    else if (value == "yearly") { this.daily = false; this.weekly = false; this.quartely = false; this.yearly = true; this.y = ''; this.invalid = false; this.listData = new MatTableDataSource([]);this.dataList =false ;this.download ="yearly" }
    else {

    }



  }
  getDailyReportList() {
    this.loading = true;
    this.listData = new MatTableDataSource([])
    let date = moment(this.todate, 'YYYY-MM-DD');
    if (this.todate == null || !this.reportOption) {
      this.invalid = true
      this.loading = false;
      this.invalidMsg = "Please ensure all options are selected"
    }
    else {

      const day = date.date();
      const month = date.month() + 1;
      const year = date.year();

      this.data.reportService.getDailyInterestReport(day, month, year).subscribe((res: any) => {
        this.invalid = false
        this.loading = false
        this.tableLength = res.data.length
        this.listData = new MatTableDataSource(res.data);
        this.dataList =true
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;



      }, err => {
        this.loading = false
        this.errorMessage = "Poor network, try again"
      })
    }
  }
  getWeeklyReport() {
    this.loading = true;
    this.listData = new MatTableDataSource([])
    if (this.m == "" || this.y =="") {
      this.loading = false;
      this.invalid = true
      this.invalidMsg = "Please select the year"
    } else {
    this.data.reportService.getWeeklyInterestReport(this.m, this.y).subscribe((res: any) => {
      this.loading = false
      this.invalid = false
      this.tableLength = res.data.length
      this.listData = new MatTableDataSource(res.data);
      this.dataList =true
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

    }, err => {
      this.loading = false
      this.errorMessage = "Poor network, try again"
    })
  }
  }

  getQuartelyReport() {
    this.loading = true;
    this.listData = new MatTableDataSource([])
    if (this.endquarter == this.startquarter) {
      this.invalid = true
      this.loading = false;
      this.invalidMsg = "Both selecton cannot be the same or empty"
    } else if (!this.endquarter || !this.startquarter || this.y == "") {
      this.invalid = true
      this.loading = false;
      this.invalidMsg = "Please ensure all parameter are selected"
    } else {


      this.data.reportService.getQuarterlyInterestReport(this.endquarter, this.y, this.startquarter).subscribe((res: any) => {
        this.invalid = false
        this.loading = false
        this.tableLength = res.data.length
        this.dataList =true
        this.listData = new MatTableDataSource(res.data);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;

      }, err => {
        this.loading = false
        this.errorMessage = "Poor network, try again"

      })
    }
  }
  getYearlyReport() {
    this.loading = true;
    this.listData = new MatTableDataSource([])
    if (this.y == "") {
      this.loading = false;
      this.invalid = true
      this.invalidMsg = "Please select the year"
    } else {

      this.data.reportService.getYearlyInterestReport(this.y).subscribe((res: any) => {

        this.loading = false
        this.invalid = false
        this.tableLength = res.data.length
        this.listData = new MatTableDataSource(res.data);
        this.dataList =true
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;

      }, err => {
        this.loading = false
        this.errorMessage = "Poor network, try again"
      })
    }
  }


  downloadPdf(){
 
    this.loading = true;
  if(this.download =="daily"){
     let date = moment(this.todate, 'YYYY-MM-DD');
    this.loading = true;
    const day = date.date();
      const month = date.month() + 1;
      const year = date.year(); 
     this.data.reportService.getDailyInterestAttachment(0,day, month, year,"PDF", 100)
    .subscribe( res => {
      downloadFilePDF(res)
      this.loading = false;
    }, err => {
      this.snackBar.open('Error downloading Report, Contact Admin', 'Dismiss', {
        duration:4000
      })
      this.loading = false; 
    })
  }
  if(this.download =="weekly"){
    this.loading = true;
     this.data.reportService.getWeeklyInterestAttachment(0,this.m, this.y,"PDF", 100)
    .subscribe( res => {
      downloadFilePDF(res)
      this.loading = false;
    }, err => {
      this.snackBar.open('Error downloading Report, Contact Admin', 'Dismiss', {
        duration:4000
      })
      this.loading = false; 
    })

  }
  if(this.download =="quartely"){
    this.loading = true;
    
     this.data.reportService.getQuartelyInterestReportAttachment(this.endquarter,0,this.y,"PDF", 100,this.startquarter)
    .subscribe( res => {
      downloadFilePDF(res)
      this.loading = false;
    }, err => {
      this.snackBar.open('Error downloading Report, Contact Admin', 'Dismiss', {
        duration:4000
      })
      this.loading = false; 
    })

  }
  if(this.download =="yearly"){
    this.loading = true;
   
     this.data.reportService.getYearlyInterestReportAttachment(0,this.y,"PDF", 100)
    .subscribe( res => {
      downloadFilePDF(res)
      this.loading = false;
    }, err => {
      this.snackBar.open('Error downloading Report, Contact Admin', 'Dismiss', {
        duration:4000
      })
      this.loading = false; 
    })

  }

  }


  downloadXcel(){
    let date = moment(this.todate, 'YYYY-MM-DD');
    this.loading = true;
    const day = date.date();
      const month = date.month() + 1;
      const year = date.year();
    this.data.reportService.getDailyInterestAttachment(0,day, month, year,"EXCEL", 100)
    .subscribe( res => {
      console.log(res)
      downloadFileEXCEL(res)
      this.loading = false;
    }, err => {
      this.snackBar.open('Error downloading Report, Contact Admin', 'Dismiss', {
        duration:4000
      })
      this.loading = false; 
    })
  }
sendReportByMail(){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;
  dialogConfig.data = this.listData.data
  dialogConfig.minWidth = '40%'
  dialogConfig.maxHeight = '90vh'
  this.dialog.open(ReportmailsendComponent, dialogConfig)
}


}
