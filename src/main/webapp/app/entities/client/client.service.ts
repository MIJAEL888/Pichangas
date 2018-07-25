import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClient } from 'app/shared/model/client.model';

type EntityResponseType = HttpResponse<IClient>;
type EntityArrayResponseType = HttpResponse<IClient[]>;

@Injectable({ providedIn: 'root' })
export class ClientService {
    private resourceUrl = SERVER_API_URL + 'api/clients';

    constructor(private http: HttpClient) {}

    create(client: IClient): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(client);
        return this.http
            .post<IClient>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(client: IClient): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(client);
        return this.http
            .put<IClient>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IClient>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IClient[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(client: IClient): IClient {
        const copy: IClient = Object.assign({}, client, {
            dateSuscription:
                client.dateSuscription != null && client.dateSuscription.isValid() ? client.dateSuscription.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateSuscription = res.body.dateSuscription != null ? moment(res.body.dateSuscription) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((client: IClient) => {
            client.dateSuscription = client.dateSuscription != null ? moment(client.dateSuscription) : null;
        });
        return res;
    }
    
    getAll(): Observable<HttpResponse<Client[]>> {
        return this.http.get<Client[]>(this.resourceUrl + "/all", { observe: 'response' })
            .map((res: HttpResponse<Client[]>) => this.convertArrayResponse(res));
    }
    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Client = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Client[]>): HttpResponse<Client[]> {
        const jsonResponse: Client[] = res.body;
        const body: Client[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Client.
     */
    private convertItemFromServer(client: Client): Client {
        const copy: Client = Object.assign({}, client);
        copy.dateSuscription = this.dateUtils
            .convertLocalDateFromServer(client.dateSuscription);
        return copy;
    }

    /**
     * Convert a Client to a JSON which can be sent to the server.
     */
    private convert(client: Client): Client {
        const copy: Client = Object.assign({}, client);
        copy.dateSuscription = this.dateUtils
            .convertLocalDateToServer(client.dateSuscription);
        return copy;
    }

}
