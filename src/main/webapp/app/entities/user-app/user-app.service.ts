import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserApp } from 'app/shared/model/user-app.model';

type EntityResponseType = HttpResponse<IUserApp>;
type EntityArrayResponseType = HttpResponse<IUserApp[]>;

@Injectable({ providedIn: 'root' })
export class UserAppService {
    private resourceUrl = SERVER_API_URL + 'api/user-apps';

    constructor(private http: HttpClient) {}

    create(userApp: IUserApp): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userApp);
        return this.http
            .post<IUserApp>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(userApp: IUserApp): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(userApp);
        return this.http
            .put<IUserApp>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IUserApp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IUserApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(userApp: IUserApp): IUserApp {
        const copy: IUserApp = Object.assign({}, userApp, {
            dateReg: userApp.dateReg != null && userApp.dateReg.isValid() ? userApp.dateReg.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateReg = res.body.dateReg != null ? moment(res.body.dateReg) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((userApp: IUserApp) => {
            userApp.dateReg = userApp.dateReg != null ? moment(userApp.dateReg) : null;
        });
        return res;
    }
}
