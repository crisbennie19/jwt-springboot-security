import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interest-list',
  templateUrl: './interest-list.component.html',
  styleUrls: ['./interest-list.component.scss'] 
})
export class InterestListComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','email','phone','amount','savingtype','trantype','date'];
  public listData: MatTableDataSource<any>;

  savingsFilter:string = "accountholder";
  placeholder = 'Savings phone or email'
  searchKey: any = ''; // Search box model
  fromdate: Date = null;
  todate:Date = null;
  loading: boolean;
  tableLength: number;
  response: any;
  daterRangeMsg:"No record found for the date range "
  searchBack:boolean;

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getInterestsList();
  }
  triggerFilter(event){
    let filtername = event.value
    switch (filtername) {
      case 'type':
      this.placeholder = "Savings type"
      break;
      case 'accountholder':
      this.placeholder = "Savings phone or email"
      break;
      case 'category':
      this.placeholder = "Savings category"
      break;
      default:
      this.placeholder = "Savings phone or email"
        break;
    }

  }

  filterSearch(){
    if(this.searchKey != ''){
      let filter = this.savingsFilter
      switch (filter) {
        case 'accountholder':
        this.loading = true;
        this.data.interestService.getInterestsByAccountholder(this.searchKey)
        .pipe(map( res => res['data']))
        .subscribe( res => {
          this.loading = false;
          this.tableLength = res.length
          this.listData = new MatTableDataSource(res);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
          this.searchBack = true;
        }, err => {
          this.loading = false;
          this.snackBar.open("Check your network and try again", "Dismiss", {
            duration:2500
          })
        })
        break;

        default:
        this.getInterestsList()
        break;
      }
    }

    else if(this.searchKey == '' && this.fromdate != null && this.todate != null ){
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth();
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear+'-'+frommonth+'-'+fromday;

      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth();
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear+'-'+tomonth+'-'+today;

      this.loading = true;
      this.data.interestService.getInterestsByDateRange(fromdateFormatted,todateFormatted)
      .pipe(map( res => res['data']))
      .subscribe( res => {
        this.response = res;
        this.loading = false;
        this.tableLength = res
        this.listData = new MatTableDataSource(res);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }, err => {
        this.loading = false;
        this.snackBar.open("Check your network and try again", "Dismiss", {
          duration:2500
        })
      })
    }

    else{
      this.getInterestsList()
    }

  }

  getInterestsList(){
    this.loading = true;

    
    this.data.interestService.getInterests(0,1000)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.response = res;
      this.loading = true;
      
      this.tableLength = this.response.length
      this.listData = new MatTableDataSource(this.response);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }
  searchByDate(){
    console.log(this.fromdate +" "+ this.todate)
    if(this.searchKey == '' && this.fromdate != null && this.todate != null ){
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth()+1;
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear+'-'+frommonth+'-'+fromday;

      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth()+1;
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear+'-'+tomonth+'-'+today;
     
      this.loading = true;
      
      this.data.interestService.getInterestsByDateRange(fromdateFormatted,todateFormatted)
      .pipe(map( res => res['data']))
      .subscribe( res => {
        this.response = res;
        this.loading = false;
        this.tableLength = res.length
        this.listData = new MatTableDataSource(res);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.searchBack = true;
      }, err => {
        this.loading = false;
        this.snackBar.open("Check your network and try again", "Dismiss", {
          duration:2500
        })
      })
    } else{
      this.daterRangeMsg
    }
    
  }

  applyFilter(){
    if(this.fromdate !=null || this.todate !=null){
      this.loading = true;
    this.data.interestService.getInterests(0,1000)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.response = res;
      this.loading = false;
      this.tableLength = this.response.length
      this.listData = new MatTableDataSource(this.response);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      this.listData.filter = this.searchKey.toString();
      this.searchBack = true;
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
    
    }
    this.listData.filter = this.searchKey.toString();
    this.searchBack = true;
   
}

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
    this.getInterestsList();
  }

}
