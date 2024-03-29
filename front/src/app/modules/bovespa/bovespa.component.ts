import {BovespaService} from '../../services/bovespa.service';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StockChart} from "angular-highcharts";
import {Bovespa} from "../../models/Bovespa";
import {StockQuote} from "../../models/StockQuote";
import {Modal} from "../company/CompanyStockView/modal.component";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-bovespa',
    templateUrl: './bovespa.component.html',
    styleUrls: ['./bovespa.component.css']
})

export class BovespaComponent implements OnInit, AfterViewInit {

    stock: StockChart;
    bovespaDataLoaded = [false, false];
    bovespa: Bovespa = new Bovespa(new StockQuote(), []);
    ok: string;

    @ViewChild('errorModal', {static: false}) errorModal;


    constructor(private _bovespaService: BovespaService, private modal: Modal, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.getQuote();
    }

    ngAfterViewInit(): void {
        this.getTimeSeries('60min');
    }

    getQuote() {
        this.bovespaDataLoaded[1] = false;
        this._bovespaService.getStock().subscribe(data => {
            this.bovespa.stockQuote = data.body;
            this.bovespaDataLoaded[1] = true;
        });
    }

    getTimeSeries(interval: string) {
        this.bovespaDataLoaded[0] = false;
        this._bovespaService.get_time_series(interval)
            .subscribe(data => {
                this.bovespa.timeSeries = data.body;
                this.loadChart();
                if (data.ok) {
                    this.toastr.success('Dados carregados', 'Sucesso!');
                }
                this.bovespaDataLoaded[0] = true;
            },(error) => {
                this.openModal();
                this.toastr.error('Erro ao buscar dados', 'Erro!');
        })
    }

    loadChart() {
        this.stock = new StockChart({
             colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
        '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
             backgroundColor: '#cdcdcd',
            type: 'line'
        },
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

    openModal(){
        this.modal.openWindow(this.errorModal);
    }
}

