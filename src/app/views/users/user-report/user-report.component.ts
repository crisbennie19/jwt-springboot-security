import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {
listData:[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
    private dialogRef: MatDialogRef<UserReportComponent>,
    private data:DataService
  ) { }

  ngOnInit() {
    this.getUsersList();
  }
  closeDialog(){
    this.dialogRef.close()
    event.preventDefault()
  }
  getUsersList(){
    
    this.data.usersService.getUsers(0,1000)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( (res:any) => {
     this.listData = res
      
   console.log(this.listData); 

    
  });

  }
}
