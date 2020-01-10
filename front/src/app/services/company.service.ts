import {Injectable} from '@angular/core';
import {CRUDService} from '../utils/crud.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Company} from "../models/Company";
import {StockQuote} from "../models/StockQuote";

@Injectable({
    providedIn: 'root'
})

export class CompanyService extends CRUDService<Company> {

    constructor(public http: HttpClient, public appConfig: AppConfigService) {
        super(http, appConfig, 'empresas');
    }


    getTop10() {
        return this.http.get<Company[]>(`${this.API_URL}/top-10`, { observe: 'response' });
    }

    getCompanyStock(symbol: string) {
        return this.http.get<StockQuote>(`${this.API_URL}/` + symbol + `/cotacao`, { observe: 'response' });
    }
}
