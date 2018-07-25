import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICampus } from 'app/shared/model/campus.model';

type EntityResponseType = HttpResponse<ICampus>;
type EntityArrayResponseType = HttpResponse<ICampus[]>;

@Injectable({ providedIn: 'root' })
export class CampusService {
    private resourceUrl = SERVER_API_URL + 'api/campuses';

    constructor(private http: HttpClient) {}

    create(campus: ICampus): Observable<EntityResponseType> {
        return this.http.post<ICampus>(this.resourceUrl, campus, { observe: 'response' });
    }

    update(campus: ICampus): Observable<EntityResponseType> {
        return this.http.put<ICampus>(this.resourceUrl, campus, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICampus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICampus[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
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
