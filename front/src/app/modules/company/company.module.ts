import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompanyComponent, CompanyStock} from './company.component';
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [CompanyComponent, CompanyStock],
  imports: [
      HttpClientModule,
    CommonModule,
    NgbModule
  ],

  providers: [NgbModal, NgbModule, CompanyStock]
})
export class CompanyModule { }
