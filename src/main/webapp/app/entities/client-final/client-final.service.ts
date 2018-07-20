import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClientFinal } from './client-final.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClientFinal>;

@Injectable()
export class ClientFinalService {

    private resourceUrl =  SERVER_API_URL + 'api/client-finals';

    constructor(private http: HttpClient) { }

    create(clientFinal: ClientFinal): Observable<EntityResponseType> {
        const copy = this.convert(clientFinal);
        return this.http.post<ClientFinal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(clientFinal: ClientFinal): Observable<EntityResponseType> {
        const copy = this.convert(clientFinal);
        return this.http.put<ClientFinal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClientFinal>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClientFinal[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClientFinal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClientFinal[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClientFinal = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClientFinal[]>): HttpResponse<ClientFinal[]> {
        const jsonResponse: ClientFinal[] = res.body;
        const body: ClientFinal[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClientFinal.
     */
    private convertItemFromServer(clientFinal: ClientFinal): ClientFinal {
        const copy: ClientFinal = Object.assign({}, clientFinal);
        return copy;
    }

    /**
     * Convert a ClientFinal to a JSON which can be sent to the server.
     */
    private convert(clientFinal: ClientFinal): ClientFinal {
        const copy: ClientFinal = Object.assign({}, clientFinal);
        return copy;
    }
}
