import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { DataService } from "src/app/data.service";
import { IncomeComponent } from "./income/income.component";

@Component({
  selector: "app-manual-funding",
  templateUrl: "./manual-funding.component.html",
  styleUrls: ["./manual-funding.component.scss"],
})
export class ManualFundingComponent implements OnInit {
  public listData = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  message: string = "Please choose a date range to search ";
  message2: boolean;

  displayedColumns = ["credit", "debit", "trans_date", "clear_date", "action"];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate: Date = null;
  todate: Date = null;
  response: any;
  email: any = "";
  name: any;
  daterRangeMsg: "No record found for the date range ";

  constructor(private data: DataService, private dialog: MatDialog) {}

  ngOnInit() {}

  applyFilter() {
    this.listData.filter = this.email.toString();
  }

  clearSearch() {
    this.email = "";
    this.applyFilter();
  }

  getCustomerByEmail() {
    if (this.email != null && this.fromdate != null && this.todate != null) {
      const fromday = this.fromdate.getDate() + 1;
      const frommonth = this.fromdate.getMonth() + 1;
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear + "-" + frommonth + "-" + fromday;

      const today = this.todate.getDate() + 1;
      const tomonth = this.todate.getMonth() + 1;
      const toyear = this.todate.getFullYear();
      const todateFormatted = toyear + "-" + tomonth + "-" + today;

      this.loading = true;
      this.data.fundingService
        .getCustomer(fromdateFormatted, todateFormatted, this.email)

        .subscribe(
          (res: any) => {
            if (res.message == "Transactions retrieved successfully") {
              this.message2 = true;
              console.log(res.datalist);
              console.log("name....", res.datalist[0].account.name);
              this.name = res.datalist[0].account.name;

              this.loading = false;
              this.tableLength = res.datalist.length;
              this.listData = new MatTableDataSource(res.datalist);
              this.listData.paginator = this.paginator;
              this.listData.sort = this.sort;
            } else {
              this.loading = false;
              this.message2 = false;
              this.response = "";
              this.response = res.data;
            }
          },
          (err) => {
            this.loading = false;
          }
        );
    } else {
    }
  }

  viewIncome(row) {
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = false;
    dialConfig.autoFocus = false;
    dialConfig.data = row;
    dialConfig.minWidth = "40%";
    dialConfig.maxHeight = "90vh";
    this.dialog.open(IncomeComponent, dialConfig);
  }

  fundCard() {}
}
