import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import {CompanyModule} from "./modules/company/company.module";
import {BovespaModule} from "./modules/bovespa/bovespa.module";
import {AppRoutingModule} from "./app-routing.module";



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
      CompanyModule,
      BovespaModule,
      AppRoutingModule
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
