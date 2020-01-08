import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {BovespaComponent} from "./modules/bovespa/bovespa.component";
import {CompanyComponent} from "./modules/company/company.component";

const routes: Route[] = [
  {path : "bovespa", component : BovespaComponent},
  {path : "empresas", component : CompanyComponent},
  {path : "", redirectTo : "cotacao-bovespa", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
