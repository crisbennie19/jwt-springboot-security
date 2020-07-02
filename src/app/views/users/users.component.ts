import { Component, OnInit } from '@angular/core';
import { verifyRole } from 'src/app/helpers/roles';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isAdmin:boolean

  constructor() { 
    this.isAdmin = verifyRole('ADMINISTRATOR')
  }

  ngOnInit() {
  }


}
