import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchedule } from 'app/shared/model/schedule.model';

type EntityResponseType = HttpResponse<ISchedule>;
type EntityArrayResponseType = HttpResponse<ISchedule[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    private resourceUrl = SERVER_API_URL + 'api/schedules';

    constructor(private http: HttpClient) {}

    create(schedule: ISchedule): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .post<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(schedule: ISchedule): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .put<ISchedule>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISchedule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(schedule: ISchedule): ISchedule {
        const copy: ISchedule = Object.assign({}, schedule, {
            startDate: schedule.startDate != null && schedule.startDate.isValid() ? schedule.startDate.toJSON() : null,
            endDate: schedule.endDate != null && schedule.endDate.isValid() ? schedule.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((schedule: ISchedule) => {
            schedule.startDate = schedule.startDate != null ? moment(schedule.startDate) : null;
            schedule.endDate = schedule.endDate != null ? moment(schedule.endDate) : null;
        });
        return res;
    }
}
