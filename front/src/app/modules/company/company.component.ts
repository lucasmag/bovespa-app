import {AfterViewInit, Component, Injectable, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CompanyService} from "../../services/company.service";
import {Company} from "../../models/Company";
import {StockQuote} from "../../models/StockQuote";
import {Modal} from "./CompanyStockView/modal.component";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit, AfterViewInit{

    @ViewChild('companyModal', {static: false}) companyModal;

    stockDataLoaded: boolean = false;
    dataSource = [];

    company: Company = new Company(0, '', '',0, '', new StockQuote());

    constructor(private _companyService: CompanyService, private companyStock: Modal, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this._companyService.getTop10().subscribe(data => {
            this.dataSource = data.body.map(function (c) {
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
        this.stockDataLoaded = false;
        this._companyService.getCompanyStock(company.symbol).subscribe(data => {
                if (!data.ok) {
                    this.toastr.error('Erro ao buscar dados', 'Erro!');
                } else {
                    this.toastr.success('Dados salvos no banco', 'Sucesso!');
                }
            this.company.stock = data.body;
            this.company.name = company.name;
            this.company.symbol = company.symbol;
            this.stockDataLoaded = true;
        });
    }


    openCompanyModal(company, modal) {
        this.getCompanyStock(company);
        this.companyStock.openWindow(modal);
    }
}
