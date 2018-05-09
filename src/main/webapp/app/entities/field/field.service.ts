import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Field } from './field.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Field>;

@Injectable()
export class FieldService {

    private resourceUrl =  SERVER_API_URL + 'api/fields';

    constructor(private http: HttpClient) { }

    create(field: Field): Observable<EntityResponseType> {
        const copy = this.convert(field);
        return this.http.post<Field>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(field: Field): Observable<EntityResponseType> {
        const copy = this.convert(field);
        return this.http.put<Field>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Field>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Field[]>> {
        const options = createRequestOption(req);
        return this.http.get<Field[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Field[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    getByCampus(id: number): Observable<HttpResponse<Field[]>>{
        return this.http.get<Field[]>(`${this.resourceUrl}/campus/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Field[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Field = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Field[]>): HttpResponse<Field[]> {
        const jsonResponse: Field[] = res.body;
        const body: Field[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Field.
     */
    private convertItemFromServer(field: Field): Field {
        const copy: Field = Object.assign({}, field);
        return copy;
    }

    /**
     * Convert a Field to a JSON which can be sent to the server.
     */
    private convert(field: Field): Field {
        const copy: Field = Object.assign({}, field);
        return copy;
    }
}
