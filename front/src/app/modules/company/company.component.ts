import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {MatTableDataSource} from "@angular/material/table";
import {Company} from "../../models/Company";
import {StockQuote} from "../../models/StockQuote";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, AfterViewInit{

    dataLoading: boolean;
    displayedColumns: string[] = ['_position', '_company_name', '_symbol', '_region', '_global_position'];
    dataSource = [];

    constructor(private _companyService: CompanyService) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this._companyService.getTop10().subscribe(data => {
            this.dataSource = data.map(function (c) {
                return {
                    _region : c['region'],
                    _symbol : c['symbol'],
                    _position: c['position'],
                    _company_name : c['company_name'],
                    _global_position: c['global_position']
                }
            });
            console.log(data)
        });
    }

    getCompanyStock(company) {
        this._companyService.getCompanyStock(company._symbol).subscribe(data => {
            console.log(data)
        })
    }

}
