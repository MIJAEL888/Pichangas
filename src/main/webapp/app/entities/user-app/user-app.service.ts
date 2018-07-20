import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { UserApp } from './user-app.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserApp>;

@Injectable()
export class UserAppService {

    private resourceUrl =  SERVER_API_URL + 'api/user-apps';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(userApp: UserApp): Observable<EntityResponseType> {
        const copy = this.convert(userApp);
        return this.http.post<UserApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userApp: UserApp): Observable<EntityResponseType> {
        const copy = this.convert(userApp);
        return this.http.put<UserApp>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserApp>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserApp[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserApp[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserApp = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserApp[]>): HttpResponse<UserApp[]> {
        const jsonResponse: UserApp[] = res.body;
        const body: UserApp[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserApp.
     */
    private convertItemFromServer(userApp: UserApp): UserApp {
        const copy: UserApp = Object.assign({}, userApp);
        copy.dateReg = this.dateUtils
            .convertLocalDateFromServer(userApp.dateReg);
        return copy;
    }

    /**
     * Convert a UserApp to a JSON which can be sent to the server.
     */
    private convert(userApp: UserApp): UserApp {
        const copy: UserApp = Object.assign({}, userApp);
        copy.dateReg = this.dateUtils
            .convertLocalDateToServer(userApp.dateReg);
        return copy;
    }
}
