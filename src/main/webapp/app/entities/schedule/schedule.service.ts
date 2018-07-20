import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Schedule } from './schedule.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Schedule>;

@Injectable()
export class ScheduleService {

    private resourceUrl =  SERVER_API_URL + 'api/schedules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(schedule: Schedule): Observable<EntityResponseType> {
        const copy = this.convert(schedule);
        return this.http.post<Schedule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(schedule: Schedule): Observable<EntityResponseType> {
        const copy = this.convert(schedule);
        return this.http.put<Schedule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Schedule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Schedule[]>> {
        const options = createRequestOption(req);
        return this.http.get<Schedule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Schedule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Schedule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Schedule[]>): HttpResponse<Schedule[]> {
        const jsonResponse: Schedule[] = res.body;
        const body: Schedule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Schedule.
     */
    private convertItemFromServer(schedule: Schedule): Schedule {
        const copy: Schedule = Object.assign({}, schedule);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(schedule.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(schedule.endDate);
        return copy;
    }

    /**
     * Convert a Schedule to a JSON which can be sent to the server.
     */
    private convert(schedule: Schedule): Schedule {
        const copy: Schedule = Object.assign({}, schedule);

        copy.startDate = this.dateUtils.toDate(schedule.startDate);

        copy.endDate = this.dateUtils.toDate(schedule.endDate);
        return copy;
    }
}
