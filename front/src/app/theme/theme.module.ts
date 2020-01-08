import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import stock from "highcharts/modules/stock.src";
import more from "highcharts/highcharts-more.src";


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ThemeModule { }
