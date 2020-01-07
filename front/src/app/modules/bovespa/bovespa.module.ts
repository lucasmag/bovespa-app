import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BovespaComponent } from './bovespa.component';
import { NgModule } from '@angular/core';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
    declarations: [
        BovespaComponent
    ],
    imports: [
        BrowserModule,
        ChartModule,
        FlexLayoutModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],
    bootstrap: [BovespaComponent]
})
export class BovespaModule { }
