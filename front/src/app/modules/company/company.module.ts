import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompanyComponent} from './company.component';
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { FlexLayoutModule } from '@angular/flex-layout';
import {Modal} from "./CompanyStockView/modal.component";



@NgModule({
  declarations: [CompanyComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    NgbModule,
    FlexLayoutModule
  ],

  providers: [NgbModal, NgbModule, Modal]
})
export class CompanyModule { }
