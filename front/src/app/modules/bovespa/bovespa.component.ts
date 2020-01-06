import {BovespaService} from '../../services/bovespa.service';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './bovespa.component.html',
    styleUrls: ['./bovespa.component.css']
})

export class BovespaComponent implements OnInit{

    stockQuote: any = [];

    constructor(private _sectorService: BovespaService) {
    }

    ngOnInit(): void {
        this.getQuote();
    }

    getQuote() {
        this._sectorService.getStock()
            .subscribe(data => {
                this.stockQuote.push({
                    symbol: data['01. symbol'],
                    open: +data['02. open'],
                    high: +data['03. high'],
                    low: +data['04. low'],
                    price: +data['05. price'],
                    volume: +data['06. volume'],
                    change_percent: data['10. change percent']
                });
                console.log(this.stockQuote);
                this.stockQuote[0].price = this.stockQuote[0].price.toLocaleString();
                this.stockQuote[0].open = this.stockQuote[0].open.toLocaleString();
                this.stockQuote[0].high = this.stockQuote[0].high.toLocaleString();
                this.stockQuote[0].low = this.stockQuote[0].low.toLocaleString();
                this.stockQuote[0].volume = this.stockQuote[0].volume.toLocaleString();

                this.stockQuote = this.stockQuote[0];
            });
    }
}

