import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { ComposeComponent } from './compose/compose.component';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { EditMessageComponent } from './edit-message/edit-message.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  loading: boolean;
  listData: any;
  tableLength: any;
  searchKey: any = ''; // left search box model

  constructor(private dialog:MatDialog,
    private data:DataService,
    private snackBar:MatSnackBar) { }

    
  ngOnInit() {
    this.getMessageList();
  }

  composeMessage(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "50%";
    dialogConfig.maxHeight = '90vh'
    this.dialog.open(ComposeComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getMessageList();
    });
  }

  editMessage(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "50%";
    dialogConfig.maxHeight = '90vh'
    dialogConfig.data = row;
    this.dialog.open(EditMessageComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getMessageList();
    });
  }

  deleteMsg(e){
    this.loading = true;
    
    this.data.messageService.deleteMessage(e.id, {})
    .subscribe( () => {
      this.loading = false;
      this.getMessageList();
      this.snackBar.open("Message deleted", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! deleting message, try again", "Dismiss", {
        duration:2000
      })
    })
  }

  getMessageList(){
    this.loading = true;
    this.data.messageService.getMessages()
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.loading = false;
      this.listData = res;
      this.tableLength = res.length
    },
    err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2000
      })
    })
  }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter()
  }

}
