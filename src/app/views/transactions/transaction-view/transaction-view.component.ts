import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-transaction-view",
  templateUrl: "./transaction-view.component.html",
  styleUrls: ["./transaction-view.component.scss"],
})
export class TransactionViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow: any,
    private dialogRef: MatDialogRef<TransactionViewComponent>
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
    event.preventDefault();
  }
}
