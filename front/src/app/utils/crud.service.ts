import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '../app-config.service';

export class CRUDService<T> {

    protected readonly API_URL;

    constructor(protected http: HttpClient, protected appConfig: AppConfigService, protected resource: string) {
        this.API_URL = this.appConfig.baseUrl + resource;
    }

    findAll() {
        return this.http.get<T>(this.API_URL);
    }

    save(object: T) {
        return this.http.post<T>(this.API_URL, object, {observe: 'response'});
    }

    update(object: T) {
        return this.http.put<T>(`${this.API_URL}/${object}`, object);
    }
}
