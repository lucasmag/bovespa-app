import {AfterViewInit, Component, Injectable, OnInit, ViewEncapsulation} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Company} from "../../models/Company";
import {StockQuote} from "../../models/StockQuote";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, AfterViewInit{

    stockDataLoaded: boolean = false;
    dataSource = [];

    company: Company = new Company('', '', 0, '', new StockQuote());

    constructor(private _companyService: CompanyService, private companyStock: CompanyStock) { }

    ngOnInit(): void {

    }

    hello = 'hello';


    ngAfterViewInit(): void {
        this._companyService.getTop10().subscribe(data => {
            this.dataSource = data.map(function (c) {
                return {
                    region: c['region'],
                    symbol: c['symbol'],
                    position: c['position'],
                    name : c['company_name'],
                    global_position: c['global_position']
                }
            });
        });
    }

    getCompanyStock(company) {
        console.log(company);
        this._companyService.getCompanyStock(company.symbol).subscribe(data => {
            this.company._stock._low = +data['04. low'];
            this.company._stock._high = +data['03. high'];
            this.company._stock._price = +data['05. price'];
            this.company._stock._volume = +data['06. volume'];
            this.company._stock._change_percent = data['10. change percent'];
            this.company._stock._latest_trading_day = data['07. latest trading day'];
            this.company.name = company.name;
            this.company.symbol = company.symbol;
            this.stockDataLoaded = true;
            console.log(this.company);
            console.log(data)
        });
    }


    openCompanyModal(company, companyModal) {
        this.getCompanyStock(company);
        this.companyStock.openWindow(companyModal);
    }
}

@Component({
  selector: 'ngbd-modal-options',
  templateUrl: './company.component.html',
  encapsulation: ViewEncapsulation.None,

})

export class CompanyStock {
    closeResult: string;

    constructor(private modalService: NgbModal) {
    }

    openWindow(content) {
        this.modalService.open(content, {windowClass: 'dark-modal', size: 'xl'});
    }
}
