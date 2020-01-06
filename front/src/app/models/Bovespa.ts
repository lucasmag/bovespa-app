export class Bovespa {
    // tslint:disable-next-line:variable-name
    private _stockQuote: string;

    constructor(stockQuote: string) {
        Object.assign(this, {stockQuote});
    }

    get stockQuote(): string {
        return this._stockQuote;
    }

    set stockQuote(value: string) {
        this._stockQuote = value;
    }
}
