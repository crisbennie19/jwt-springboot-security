import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { CreditRequestActionComponent } from '../credit-request-action/credit-request-action.component';
import { CreditBankStatementComponent } from '../credit-bank-statement/credit-bank-statement.component';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.scss']
})
export class CreditRequestComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','account','phone','date', 'status','action'];
  public listData: MatTableDataSource<any>; 

  creditFilter:string = "accountholder";
  searchKey: any = ''; // left search box model
  fromdate: Date = null;
  todate:Date = null; 
  placeholder = 'Phone or email'

  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.getCreditRequests();
  }

  triggerFilter(event){    
    let filtername = event.value
    switch (filtername) {
      case 'type':
      this.placeholder = "Savings type"
      break;
      case 'accountholder':
      this.placeholder = "Phone or email"
      break;
      case 'category':
      this.placeholder = "Savings category"
      break;
      default:
      this.placeholder = "Phone or email"      
        break;
    }

  }

  getCreditRequests(){
    this.loading = true;
    this.data.creditService.getCreditRequests(0,100)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.loading = false;
      this.tableLength = res.length
      this.listData = new MatTableDataSource(res);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2000
      })
    })
  }

  viewStatement(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = row
    this.dialog.open(CreditBankStatementComponent, dialogConfig)
  }

  requestAction(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '40%';
    dialogConfig.data = row
    this.dialog.open(CreditRequestActionComponent, dialogConfig).afterClosed()
    .subscribe( () => this.getCreditRequests())
  }

  // viewStatement(row){
  //   console.log("ViewerJS");
    
  // }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}

