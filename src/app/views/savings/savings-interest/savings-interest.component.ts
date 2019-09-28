import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { AddSavinginterestComponent } from '../add-savinginterest/add-savinginterest.component';
import { EditSavinginterestComponent } from '../edit-savinginterest/edit-savinginterest.component';

@Component({
  selector: 'app-savings-interest',
  templateUrl: './savings-interest.component.html',
  styleUrls: ['./savings-interest.component.scss']
})
export class SavingsInterestComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category','rate','type','date', 'status','action'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  
  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getInterestList();
  }

  getInterestList(){
    this.loading = true;
    this.data.savingsService.getSavingsInterest()
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
        duration:2500
      })
    })
  }

  openInterestAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "40%";
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(AddSavinginterestComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getInterestList();
    });
  }

  openInterestEdit(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "40%";
    dialogConfig.maxHeight = '90vh'; 
    dialogConfig.data = row
    this.dialog.open(EditSavinginterestComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getInterestList();
    });
  }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
    // this.getTransactionList();
  }

}