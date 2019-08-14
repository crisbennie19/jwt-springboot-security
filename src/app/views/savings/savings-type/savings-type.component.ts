import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { EditSavingtypeComponent } from '../edit-savingtype/edit-savingtype.component';
import { AddSavingtypeComponent } from '../add-savingtype/add-savingtype.component';

@Component({
  selector: 'app-savings-type',
  templateUrl: './savings-type.component.html',
  styleUrls: ['./savings-type.component.scss']
})
export class SavingsTypeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','points','max','min','maxwithdrawal','action'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  
  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getTypeList();
  }

  getTypeList(){
    this.loading = true;
    this.data.savingsService.getSavingsType()
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

  
  openTypeAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "40%";
    dialogConfig.maxHeight = '90vh'; 
    this.dialog.open(AddSavingtypeComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getTypeList();
    });
  }

  openTypeEdit(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "40%";
    dialogConfig.maxHeight = '90vh'; 
    dialogConfig.data = row;
    this.dialog.open(EditSavingtypeComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getTypeList();
    });
  }

  deleteType(e){
    this.loading = true;
    this.data.savingsService.deleteSavingType(e.id, {})
    .subscribe( () => {
      this.loading = false;
      this.getTypeList();
      this.snackBar.open("Savings type deleted", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! deleting Savings type, try again", "Dismiss", {
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