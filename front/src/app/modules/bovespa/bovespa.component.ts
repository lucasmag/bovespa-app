import {BovespaService} from '../../services/bovespa.service';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StockChart} from "angular-highcharts";
import {Bovespa} from "../../models/Bovespa";
import {StockQuote} from "../../models/StockQuote";
import {Theme} from "../../utils/theme/highchart"

@Component({
    selector: 'app-bovespa',
    templateUrl: './bovespa.component.html',
    styleUrls: ['./bovespa.component.css']
})

export class BovespaComponent implements OnInit, AfterViewInit {

    stock: StockChart;
    stockQuote: any = [];
    bovespaTimeSeries: any = [];
    bovespaDataLoaded = false;
    bovespa: Bovespa = new Bovespa(new StockQuote(), []);

    constructor(private _bovespaService: BovespaService) {
    }

    ngOnInit(): void {
        this.getQuote();
    }

    ngAfterViewInit(): void {
        this.getTimeSeries();
    }

    getQuote() {
        this._bovespaService.getStock().subscribe(data => {
            this.bovespa.stockQuote._low = +data['04. low'];
            this.bovespa.stockQuote._high = +data['03. high'];
            this.bovespa.stockQuote._price = +data['05. price'];
            this.bovespa.stockQuote._volume = +data['06. volume'];
            this.bovespa.stockQuote._change_percent = data['10. change percent'];
            this.bovespa.stockQuote._latest_trading_day = data['07. latest trading day'];
            this.bovespaDataLoaded = true;
            console.log(this.bovespa);
        });
    }

    getTimeSeries() {
        this._bovespaService.get_time_series('60min')
            .subscribe(data => {
                this.bovespa.timeSeries = data;
                this.loadChart();
            });
    }

    loadChart() {
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
                data: this.bovespa.timeSeries
            }]
        });
    }

}

