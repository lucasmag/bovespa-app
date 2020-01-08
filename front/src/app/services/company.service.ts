import {Injectable} from '@angular/core';
import {CRUDService} from '../utils/crud.service';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {Company} from "../models/Company";

@Injectable({
    providedIn: 'root'
})

export class CompanyService extends CRUDService<Company> {

    constructor(public http: HttpClient, public appConfig: AppConfigService) {
        super(http, appConfig, 'empresas');
    }


    getTop10() {
        return this.http.get<Company[]>(`${this.API_URL}/top-10`);
    }

    getCompanyStock(symbol: string) {
        return this.http.get<any[]>(`${this.API_URL}/` + symbol + `/cotacao`);
    }
}
