import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  public addMessageForm:FormGroup;
  
  newMessage = {
    category:'',
    description:'',
    point:0,
    priority:''
  }
  loading: boolean;

  constructor(
    private dialogRef: MatDialogRef<ComposeComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.addMessageForm = this.formBuilder.group({
      'category':['', Validators.required],
      'description':['', Validators.required],
      'points':['', Validators.required],
      'priority':['', Validators.required]
    })
  }

  saveMessage(){
    if(this.addMessageForm.invalid){
      return;
    }
    this.loading = true;

    let form = this.addMessageForm
    this.newMessage.category = form.get('category').value;
    this.newMessage.description = form.get('description').value;
    this.newMessage.point = form.get('points').value;
    this.newMessage.priority = form.get('priority').value;

    this.data.messageService.createUpdateMessage(this.newMessage)
    .subscribe( () => {
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open("New Message Added", "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error saving message, try again","Dismiss",{
        duration:2000
      })
    })
  }

  closeDialog(){
    this.dialogRef.close();
    event.preventDefault();
  }

}
