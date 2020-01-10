import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BovespaComponent } from './bovespa.component';
import { NgModule } from '@angular/core';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import {CommonModule} from "@angular/common";
import {CompanyModule} from "../company/company.module";
import {Modal} from "../company/CompanyStockView/modal.component";
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
    declarations: [
        BovespaComponent,
    ],
    imports: [
        CommonModule,
        CompanyModule,
        BrowserModule,
        ChartModule,
        FlexLayoutModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbButtonsModule,
        FormsModule
    ],
    providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }, Modal],
    bootstrap: [BovespaComponent]
})
export class BovespaModule { }
