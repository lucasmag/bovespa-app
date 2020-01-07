import {BovespaService} from '../../services/bovespa.service';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StockChart} from "angular-highcharts";


declare var Highcharts: any;

@Component({
    selector: 'app-root',
    templateUrl: './bovespa.component.html',
    styleUrls: ['./bovespa.component.css']
})

export class BovespaComponent implements OnInit, AfterViewInit {

    stock: StockChart;
    stockQuote: any = [];
    bovespaTimeSeries: any = [];
    bovespaDataLoaded = false;
    stockPrices = [];

    constructor(private _bovespaService: BovespaService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.getQuote();
        this.getTimeSeries();
    }

    getQuote() {
        this._bovespaService.getStock()
            .subscribe(data => {
                this.stockQuote.push({
                    symbol: data['01. symbol'],
                    open: +data['02. open'],
                    high: +data['03. high'],
                    low: +data['04. low'],
                    latest_trading_day: data['07. latest trading day'],
                    price: +data['05. price'],
                    volume: +data['06. volume'],
                    change_percent: data['10. change percent']
                });
                console.log(this.stockQuote);
                this.stockQuote = this.stockQuote[0];

                this.stockQuote.price = this.stockQuote.price.toLocaleString();
                this.stockQuote.open = this.stockQuote.open.toLocaleString();
                this.stockQuote.high = this.stockQuote.high.toLocaleString();
                this.stockQuote.low = this.stockQuote.low.toLocaleString();
                this.stockQuote.volume = this.stockQuote.volume.toLocaleString();
            });
    }

    getTimeSeries() {
        this._bovespaService.get_time_series('60min')
            .subscribe(data => {
                this.bovespaTimeSeries = data;
                this.loadAnotherChart();
            });
    }

    loadAnotherChart() {

        this.stock = new StockChart({
            rangeSelector: {
                selected: 3
            },
            series: [{
                type: 'line',
                tooltip: {
                    valueDecimals: 2
                },
                name: 'AAPL',
                data: this.bovespaTimeSeries
            }]
        });
    }

    loadChart() {
        Highcharts.stockChart('chart', {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: 'IBOVESPA'
            },
            series: [{
                type: 'line',
                tooltip: {
                    valueDecimals: 2
                },
                name: 'AAPL',
                data: this.stockPrices
            }]
        });
    }
}

