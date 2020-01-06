import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BovespaComponent } from './bovespa.component';

@NgModule({
  declarations: [
    BovespaComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [BovespaComponent]
})
export class BovespaModule { }
