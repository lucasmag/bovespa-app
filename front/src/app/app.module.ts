import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import {CompanyModule} from "./modules/company/company.module";
import {BovespaModule} from "./modules/bovespa/bovespa.module";
import {AppRoutingModule} from "./app-routing.module";
import {Modal} from "./modules/company/CompanyStockView/modal.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";




@NgModule({
  declarations: [AppComponent, Modal],
  imports: [
    CommonModule,
      CompanyModule,
      BovespaModule,
      AppRoutingModule,
      BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
