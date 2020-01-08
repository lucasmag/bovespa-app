import {StockQuote} from "./StockQuote";

export class Bovespa {
    // tslint:disable-next-line:variable-name
    private _stockQuote: StockQuote;
    private _timeSeries: any [];


    constructor(stockQuote: any, timeSeries: any[]) {
        this._stockQuote = stockQuote;
        this._timeSeries = timeSeries;
    }


    get timeSeries(): any[] {
        return this._timeSeries;
    }

    set timeSeries(value: any[]) {
        this._timeSeries = value;
    }


    get stockQuote(): StockQuote {
        return this._stockQuote;
    }

    set stockQuote(value: StockQuote) {
        this._stockQuote = value;
    }
}
