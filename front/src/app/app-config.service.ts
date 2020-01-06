import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    // tslint:disable-next-line:variable-name
    private readonly _baseUrl = 'http://localhost:8000/api/';

    constructor() {
    }

    get baseUrl(): string {
        return this._baseUrl;
    }
}
