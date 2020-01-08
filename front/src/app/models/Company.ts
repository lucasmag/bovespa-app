import {StockQuote} from "./StockQuote";

export class Company {

    private _position: number;
    private _name : string;
    private _symbol : string;
    private _globalPosition : number;
    private _region : string;
    private _stock : StockQuote;


    constructor(name: string, symbol: string, globalPosition: number, region: string, stock: StockQuote) {
        this._name = name;
        this._symbol = symbol;
        this._globalPosition = globalPosition;
        this._region = region;
        this._stock = stock;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get symbol(): string {
        return this._symbol;
    }

    set symbol(value: string) {
        this._symbol = value;
    }

    get globalPosition(): number {
        return this._globalPosition;
    }

    set globalPosition(value: number) {
        this._globalPosition = value;
    }

    get region(): string {
        return this._region;
    }

    set region(value: string) {
        this._region = value;
    }

    get stock(): StockQuote {
        return this._stock;
    }

    set stock(value: StockQuote) {
        this._stock = value;
    }
}
