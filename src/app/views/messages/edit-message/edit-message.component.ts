import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss']
})
export class EditMessageComponent implements OnInit {

  public addMessageForm:FormGroup;
  
  newMessage = {
    category:'',
    description:'',
    point:0,
    priority:''
  }

  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
    private dialogRef: MatDialogRef<EditMessageComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.addMessageForm = this.formBuilder.group({
      'category':[this.selectedRow.category, Validators.required],
      'description':[this.selectedRow.description, Validators.required],
      'points':[this.selectedRow.point, Validators.required],
      'priority':[this.selectedRow.priority, Validators.required]
    })
  }

  saveMessage(){
    if(this.addMessageForm.invalid){
      return;
    }
    this.loading = true;

    let form = this.addMessageForm
    this.selectedRow.category = form.get('category').value;
    this.selectedRow.description = form.get('description').value;
    this.selectedRow.point = form.get('points').value;
    this.selectedRow.priority = form.get('priority').value;

    this.data.messageService.createUpdateMessage(this.selectedRow)
    .subscribe( () => {
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open("Message Edited", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! editing message, try again","Dismiss",{
        duration:2000
      })
    })
    

  }

  closeDialog(){
    this.dialogRef.close();
    event.preventDefault();
  }

}