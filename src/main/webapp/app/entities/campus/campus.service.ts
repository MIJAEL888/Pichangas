import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Campus } from './campus.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Campus>;

@Injectable()
export class CampusService {

    private resourceUrl =  SERVER_API_URL + 'api/campuses';

    constructor(private http: HttpClient) { }

    create(campus: Campus): Observable<EntityResponseType> {
        const copy = this.convert(campus);
        return this.http.post<Campus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campus: Campus): Observable<EntityResponseType> {
        const copy = this.convert(campus);
        return this.http.put<Campus>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Campus>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Campus[]>> {
        const options = createRequestOption(req);
        return this.http.get<Campus[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Campus[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    getAllByClient(id: number): Observable<HttpResponse<Campus[]>> {
        return this.http.get<Campus[]>(`${this.resourceUrl}/client/${id}`, { observe: 'response'})
            .map((res: HttpResponse<Campus[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Campus = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Campus[]>): HttpResponse<Campus[]> {
        const jsonResponse: Campus[] = res.body;
        const body: Campus[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Campus.
     */
    private convertItemFromServer(campus: Campus): Campus {
        const copy: Campus = Object.assign({}, campus);
        return copy;
    }

    /**
     * Convert a Campus to a JSON which can be sent to the server.
     */
    private convert(campus: Campus): Campus {
        const copy: Campus = Object.assign({}, campus);
        return copy;
    }
}
