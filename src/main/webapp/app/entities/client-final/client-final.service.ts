import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClientFinal } from 'app/shared/model/client-final.model';

type EntityResponseType = HttpResponse<IClientFinal>;
type EntityArrayResponseType = HttpResponse<IClientFinal[]>;

@Injectable({ providedIn: 'root' })
export class ClientFinalService {
    private resourceUrl = SERVER_API_URL + 'api/client-finals';

    constructor(private http: HttpClient) {}

    create(clientFinal: IClientFinal): Observable<EntityResponseType> {
        return this.http.post<IClientFinal>(this.resourceUrl, clientFinal, { observe: 'response' });
    }

    update(clientFinal: IClientFinal): Observable<EntityResponseType> {
        return this.http.put<IClientFinal>(this.resourceUrl, clientFinal, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClientFinal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClientFinal[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
