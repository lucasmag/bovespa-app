import {Injectable} from '@angular/core';
import {CRUDService} from '../utils/crud.service';
import {Bovespa} from '../models/Bovespa';
import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';
import {StockQuote} from "../models/StockQuote";

@Injectable({
    providedIn: 'root'
})

export class BovespaService extends CRUDService<Bovespa> {

    constructor(public http: HttpClient, public appConfig: AppConfigService) {
        super(http, appConfig, 'bovespa');
    }

    getStock() {
        return this.http.get<StockQuote>(`${this.API_URL}/cotacao`, { observe: 'response' });
    }

    get_time_series(timeInterval: string) {
        return this.http.get<any[]>(`${this.API_URL}/historico/` + timeInterval, { observe: 'response' });
    }
}
