import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transfer-logs',
  templateUrl: './transfer-logs.component.html',
  styleUrls: ['./transfer-logs.component.scss']
})
export class TransferLogsComponent implements OnInit {
  fromdate: Date = null;
  todate:Date = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','amount','date','from','to', 'status'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  
  loading: boolean;
  tableLength: number;
  response: any;

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getTransferLogs();
  }

  getTransferLogs(){
    this.loading = true;
    this.data.logsService.getTransferLogs(0,1000)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.loading = false;
      if(res == "Record Not Found"){
        this.tableLength = 0
        this.listData = new MatTableDataSource([]);        
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
      
      else{
        this.tableLength = res.length
        this.listData = new MatTableDataSource(res);        
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
      
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }

  filterSearch(){
    if(this.fromdate != null && this.todate != null ){
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth();
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear+'-'+frommonth+'-'+fromday;

      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth();
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear+'-'+tomonth+'-'+today;
      this.loading = true;

      this.data.logsService.getTransferLogsRange(fromdateFormatted,todateFormatted)
      .pipe(
        map( res => res['data'])
      )
      .subscribe( res => {
        this.loading = false;
        if(res == "Record Not Found"){
          this.tableLength = 0
          this.listData = new MatTableDataSource([]);        
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        }
        
        else{
          this.tableLength = res.length
          this.listData = new MatTableDataSource(res);        
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        }
        
      }, err => {
        this.loading = false;
        this.snackBar.open("Check your network and try again", "Dismiss", {
          duration:2500
        })
      })
    }
    else if(this.fromdate == null && this.todate == null ){
      this.getTransferLogs();
    }

  }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}