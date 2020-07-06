import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { getDate } from 'src/app/helpers/dateFormat';
import { SearchViewComponent } from './search-view/search-view.component';

@Component({
  selector: 'app-support-search',
  templateUrl: './support-search.component.html',
  styleUrls: ['./support-search.component.scss']
})
export class SupportSearchComponent implements OnInit {

  dateFrom:string
  dateTo:string
  searchParam:string
  endpoint:any

  charges:boolean
  trans:boolean
  vcard: boolean
  wallet:boolean
  default: boolean
  savings: boolean
  error: boolean



  public listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  message: string 
  searchKey: any = '';

  
  transactionColumn = ['transactiondate','amount'];
  walletColumn = ['lastmodified','amount'];
  chargesColumn = ['trandate', 'description','amount'];
  defaultColumn = ['datecreated','datepaid', 'amount','charges'];
  vcardColumn = [ 'transdate','amount'];
  savingsColumn = ['datecreated','amount'];

  loading: boolean;
  tableLength: number;
  mydata: any = [];
 
  selectCategory:any
  
  searchCategory = [{value:"Defaultusers", name:'Defaulter'},
                    {value:"Transaction", name:'Transactions'},
                    {value:"Wallet", name:'Wallet'},
                    {value:"Charges", name:'Charges'},
                    {value:"Savings", name:'Savings'},
                    {value:"Vcards", name:'Vcards'}
                  ]

  
  constructor(private data: DataService, private dialog:MatDialog) { }

  ngOnInit() {
   
  }
getSupportSearch(category:string,dateFrom:string, dateTo:string,searchParam:string){
  this.loading = true;
  this.data.supportSearch.getSupportByCharges(category,dateFrom,dateTo,searchParam).subscribe((res:any)=>{
 
    //console.log(res)
    if (res.message == "true") {
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


searchSupport(){
  
  this.default = false
  this.trans=false
  this.vcard = false
  this.charges = false
  this.wallet = false
  if(this.dateFrom == null || this.dateTo ==null || this.searchParam ==null){
    this.error = true
   this.message = "Fill the require fields"
    return
  }
this.error = false
    
  
  let fromdate = getDate(this.dateFrom)
  let todate = getDate(this.dateTo)
  let searchParam = this.searchParam
  
 
  

  if(this.selectCategory =="Defaultusers"){
   this.default = true
   this.endpoint = "defaultusers"
   this.getSupportSearch(this.endpoint,fromdate,todate,searchParam)
   
  }
  else if(this.selectCategory =="Transaction"){
    this.trans=true
    this.endpoint = "transactions"
    this.getSupportSearch(this.endpoint,fromdate,todate,searchParam)
    
  }
  else if(this.selectCategory =="Wallet"){
    this.wallet = true
    this.endpoint = "wallets"
    this.getSupportSearch(this.endpoint,fromdate,todate,searchParam)
    
  }
  else if(this.selectCategory =="Charges"){
    this.charges = true
    this.endpoint = "deduction"

    this.getSupportSearch(this.endpoint,fromdate,todate,searchParam)
    
  }
  else if(this.selectCategory =="Vcards"){
    this.vcard = true
    this.endpoint = "vcards"
    this.getSupportSearch(this.endpoint,fromdate,todate,searchParam)
    
  }
  else if(this.selectCategory =="Savings"){
    this.vcard = true
    this.endpoint = "savings"
    this.getSupportSearch(this.endpoint,fromdate,todate,searchParam)
    
  }

}

applyFilter() {
  this.listData.filter = this.searchKey.toString();
  this.listData['accountid'].filter = this.searchKey.toString();

}

clearSearch() {
  this.searchKey = '';
  this.applyFilter()
}
viewSearch(row){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = false;
  dialogConfig.data = row
  dialogConfig.minWidth = '60%'
  dialogConfig.maxHeight = '90vh'
  this.dialog.open(SearchViewComponent, dialogConfig)
}

}
