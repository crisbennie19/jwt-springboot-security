import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['card','balance','expiry','date', 'status','action'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  creditFilter:string = "accountholder";
  fromdate: Date = null;
  todate:Date = null; 
  placeholder = 'Phone or email'
  
  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getCardList();
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

  getCardList(){
    this.loading = true;
    this.data.cardService.getCards(0,100)
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

  activateCard(e){
    this.loading = true;
    this.data.cardService.activateCard(e.accountid, {})
    .subscribe( (res) => {
      this.loading = false;
      this.snackBar.open(res['Message'], "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! Activating card, try again", "Dismiss", {
        duration:2000
      })
    })
  }
  
  deactivateCard(e){
    this.loading = true;
    this.data.cardService.deactivateCard(e.accountid, {})
    .subscribe( (res) => {
      this.loading = false;
      this.snackBar.open(res['Message'], "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! Deactivating card, try again", "Dismiss", {
        duration:2000
      })
    })
  }

  terminateCard(e){
    this.loading = true;
    this.data.cardService.terminateCard(e.bin)
    .subscribe( () => {
      this.loading = false;
      this.snackBar.open("Card deactivated", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! Deactivating card, try again", "Dismiss", {
        duration:2000
      })
    })
  }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}

