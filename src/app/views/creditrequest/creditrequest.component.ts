import { Component, OnInit } from '@angular/core';
import { verifyRole } from 'src/app/helpers/roles';

@Component({
  selector: 'app-credit-request',
  templateUrl: './creditrequest.component.html',
  styleUrls: ['./creditrequest.component.scss']
})
export class CreditRequestComponent implements OnInit {
  isBank: any;

  constructor() {
    this.isBank = verifyRole('BANK')
   }

  ngOnInit() {
  }

}
