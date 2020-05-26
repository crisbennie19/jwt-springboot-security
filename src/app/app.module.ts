import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import * as moment from 'moment'
// import { ImageViewerModule } from 'ng2-image-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule,
  MatCardModule, MatMenuModule, MatInputModule, MatDialogModule,MatFormFieldModule,MatSelectModule,
  MatRadioModule,MatTooltipModule, MatSliderModule, MatCheckboxModule,MatSnackBarModule
  ,MatNativeDateModule,
  MAT_DIALOG_DATA
} from '@angular/material';


import { BaseComponent } from './base/base.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { TransactionsComponent } from './views/transactions/transactions.component';
import { UsersListComponent } from './views/users/users-list/users-list.component';
import { ChargesComponent } from './views/charges/charges.component';
import { SavingsComponent } from './views/savings/savings.component';
import {CreditComponent } from './views/credit/credit.component';
import { MessagesComponent } from './views/messages/messages.component';
import { TableComponent } from './table/table.component';
import { AdminUsersListComponent } from './views/users/admin-users-list/admin-users-list.component';
import { AdminUserAddComponent } from './views/users/admin-user-add/admin-user-add.component';
import { AdminUsersEditComponent } from './views/users/admin-users-edit/admin-users-edit.component';
import { UsersComponent } from './views/users/users.component';
import { AdminRolesComponent } from './views/users/admin-roles/admin-roles.component';
import { SavingsListComponent } from './views/savings/savings-list/savings-list.component';
import { SavingsTypeComponent } from './views/savings/savings-type/savings-type.component';
import { SavingsInterestComponent } from './views/savings/savings-interest/savings-interest.component';
import { TransferLogsComponent } from './views/logs/transfer-logs/transfer-logs.component';
import { CardLogsComponent } from './views/logs/card-logs/card-logs.component';
import { LogsComponent } from './views/logs/logs.component';
import { WithdrawalComponent } from './views/withdrawal/withdrawal.component';
import { ReferralComponent } from './views/referral/referral.component';
import { CreditCardComponent } from './views/credit/credit-card/credit-card.component';
import { CreditInterestComponent } from './views/credit/credit-interest/credit-interest.component';
import { SentComponent } from './views/messages/sent/sent.component';
import { SavedComponent } from './views/messages/saved/saved.component';
import { ComposeComponent } from './views/messages/compose/compose.component';
import { EditMessageComponent } from './views/messages/edit-message/edit-message.component';
import { EditSavinginterestComponent } from './views/savings/edit-savinginterest/edit-savinginterest.component';
import { AddSavinginterestComponent } from './views/savings/add-savinginterest/add-savinginterest.component';
import { EditSavingtypeComponent } from './views/savings/edit-savingtype/edit-savingtype.component';
import { AddSavingtypeComponent } from './views/savings/add-savingtype/add-savingtype.component';
import { LandingpageComponent } from './views/landingpage/landingpage.component';
import { WalletComponent } from './views/wallets/wallet/wallet.component';
import { SavingsBalanceComponent } from './views/savings/savings-balance/savings-balance.component';
import { InterestListComponent } from './views/interests/interest-list/interest-list.component';
import { InterestBalanceComponent } from './views/interests/interest-balance/interest-balance.component';
import { InterestsComponent } from './views/interests/interests.component';
import { WalletBalanceComponent } from './views/wallets/wallet-balance/wallet-balance.component';
import { WalletsComponent } from './views/wallets/wallets.component';
import { SavingsBalanceViewComponent } from './views/savings/savings-balance-view/savings-balance-view.component';
import { SavingsViewComponent } from './views/savings/savings-view/savings-view.component';
import { WalletViewComponent } from './views/wallets/wallet-view/wallet-view.component';
import { CreditRequestActionComponent } from './views/credit/credit-request-action/credit-request-action.component';
import { CreditBankStatementComponent } from './views/credit/credit-bank-statement/credit-bank-statement.component';
import { AccountHolderComponent } from './views/wallets/search/account-holder/account-holder.component'
import { DateRangeComponent } from './views/wallets/search/date-range/date-range.component';
import { UsersViewComponent } from './views/users/users-view/users-view.component';
import { SettingsComponent } from './views/settings/settings.component'
import { CreditApproveComponent } from './views/creditrequest/credit-approve/credit-approve';
import { AwaitingReviewComponent } from './views/creditrequest/awaiting-review/awaiting-review.component';
import { AwaitingApprrovalComponent } from './views/creditrequest/awaiting-approval/awaiting-approval.component';
import { CreditReviewComponent } from './views/creditrequest/credit-review/credit-review.component';
import { CreditToApproveComponent } from './views/creditrequest/credit-to-approve/credit-to-approve.component';
import { CreditCheckComponent } from './views/creditrequest/credit-check/credit-check.component';
import { CreditAccountStatementComponent } from './views/creditrequest/credit-account-statement/credit-account-statement.component';
import { CreditRequestHistoryComponent } from './views/creditrequest/credit-request-history/credit-request-history.component';
import { UserReportComponent } from './views/users/user-report/user-report.component';
import { CreditReportComponent } from './views/creditrequest/credit-report/credit-report.component';
import { CreditSubjectComponent } from './views/creditrequest/credit-subject/credit-subject.component';
import { CreditBureauComponent } from './views/creditrequest/credit-bureau/credit-bureau.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CreditRequestComponent } from './views/creditrequest/creditrequest.component';
import { CreditRequestComponentMain } from './views/credit/credit-request/credit-request.component';

import { AuthInterceptor } from '../app/api/http.interceptor';
import { ReportsComponent } from './views/reports/reports.component';
import { CreditCardReportComponent } from './views/reports/credit-card-report/credit-card-report.component';
import { InterestReportComponent } from './views/reports/interest-report/interest-report.component';
import { SavingsReportComponent } from './views/reports/savings-report/savings-report.component';
import { TransactionReportComponent } from './views/reports/transaction-report/transaction-report.component';
import { VcardReportComponent } from './views/reports/vcard-report/vcard-report.component';
import { WalletReportComponent } from './views/reports/wallet-report/wallet-report.component';
import { SupportComponent } from './views/support/support.component';
import { PlatformSupportsComponent } from './views/support/platform-supports/platform-supports.component';
import { SupportTickestComponent } from './views/support/support-tickest/support-tickest.component';
import { ViewSupportComponent } from './views/support/view-support/view-support.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    DashboardComponent,
    TransactionsComponent,
    UsersListComponent,
    ChargesComponent,
    SavingsComponent,
    CreditRequestComponent,
    CreditRequestComponentMain,
    ReportsComponent,

    CreditComponent,

    MessagesComponent,
    TableComponent,
    AdminUsersListComponent,
    AdminUserAddComponent,
    AdminUsersEditComponent,
    UsersComponent,
    AdminRolesComponent,
    SavingsListComponent,
    SavingsTypeComponent,
    SavingsInterestComponent,
    TransferLogsComponent,
    CardLogsComponent,
    LogsComponent,
    WithdrawalComponent,
    ReferralComponent,
    CreditCardComponent,
    CreditInterestComponent,
    SentComponent,
    SavedComponent,
    ComposeComponent,
    EditMessageComponent,
    EditSavinginterestComponent,
    AddSavinginterestComponent,
    EditSavingtypeComponent,
    AddSavingtypeComponent,
    LandingpageComponent,
    WalletComponent,
    SavingsBalanceComponent,
    InterestListComponent,
    InterestBalanceComponent,
    InterestsComponent,
    WalletBalanceComponent,
    WalletsComponent,
    SavingsBalanceViewComponent,
    SavingsViewComponent,
    WalletViewComponent,
    CreditApproveComponent,
    CreditRequestActionComponent,
    CreditBankStatementComponent,
    SettingsComponent,
    DateRangeComponent,
    AccountHolderComponent,
    UsersViewComponent,
    AwaitingReviewComponent,
    AwaitingApprrovalComponent,
    SettingsComponent,
    CreditReviewComponent,
    CreditToApproveComponent,
    CreditCheckComponent,
    CreditAccountStatementComponent,
    CreditRequestHistoryComponent,
    UserReportComponent,
    CreditReportComponent,
    CreditSubjectComponent,
    UserReportComponent,
    CreditBureauComponent,
    CreditCardReportComponent,
    InterestReportComponent,
    SavingsReportComponent,
    TransactionReportComponent,
    VcardReportComponent,
    WalletReportComponent,
    SupportComponent,
    PlatformSupportsComponent,
    SupportTickestComponent,
    ViewSupportComponent
  ],
  imports: [
    // ImageViewerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSnackBarModule,
    MatCheckboxModule,
    
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  entryComponents:[
    ComposeComponent,
    EditMessageComponent,
    AdminUserAddComponent,
    AdminUsersEditComponent,
    AddSavinginterestComponent,
    EditSavinginterestComponent,
    AddSavingtypeComponent,
    EditSavingtypeComponent,
    WalletViewComponent,
    SavingsBalanceViewComponent,
    SavingsViewComponent,
    CreditRequestActionComponent,
    CreditBankStatementComponent,
    UsersViewComponent,
    AwaitingApprrovalComponent,
    CreditReviewComponent,
    CreditToApproveComponent,
    CreditCheckComponent,
    CreditAccountStatementComponent,
    CreditRequestHistoryComponent,
    UserReportComponent,
    CreditRequestHistoryComponent,
    CreditBureauComponent
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);