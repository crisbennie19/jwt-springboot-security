import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DataService } from "src/app/data.service";

@Component({
  selector: "app-income",
  templateUrl: "./income.component.html",
  styleUrls: ["./income.component.scss"],
})
export class IncomeComponent implements OnInit {
  payload = {
    customer_id: "",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IncomeComponent>,
    private crud: DataService
  ) {}

  ngOnInit() {
    
    this.getIncome();
  }

  getIncome() {
    this.payload.customer_id = this.data.customer["_id"];
    this.crud.fundingService.getIncome(this.payload).subscribe((res: any) => {
      console.log(res);
    });
  }

  closeDialog() {
    this.dialogRef.close();
    event.preventDefault();
  }
}
