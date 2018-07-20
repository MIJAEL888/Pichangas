///<reference path="../../../../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {FORMAT_DATE_TIME, SERVER_API_URL} from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Booking } from './booking.model';
import { createRequestOption } from '../../shared';
import {DatePipe} from "@angular/common";

export type EntityResponseType = HttpResponse<Booking>;

@Injectable()
export class BookingService {

    private resourceUrl =  SERVER_API_URL + 'api/bookings';

    constructor(private http: HttpClient,
                private dateUtils: JhiDateUtils,
                private datePipe: DatePipe) { }

    create(booking: Booking): Observable<EntityResponseType> {
        const copy = this.convert(booking);
        return this.http.post<Booking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    validate (booking: Booking): Observable<EntityResponseType> {
        const copy = this.convert(booking);
        return this.http.post<Booking>(`${this.resourceUrl}/validate`, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }
    async validateSync(booking: Booking, callback?) {
        const cb = callback || function() {};
        return await new Promise((resolve, reject) => {
            this.validate(booking).subscribe((data) => {
                resolve(data);
                return cb();
            }, (err) => {
                reject(err);
                return cb(err);
            });
        });
    }
    update(booking: Booking): Observable<EntityResponseType> {
        const copy = this.convert(booking);
        return this.http.put<Booking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Booking>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Booking[]>> {
        const options = createRequestOption(req);
        return this.http.get<Booking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Booking[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    getByField(id: number): Observable<HttpResponse<Booking[]>> {
        return this.http.get<Booking[]>(`${this.resourceUrl}/field/${id}`, { observe: 'response' })
            .map((res: HttpResponse<Booking[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Booking = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Booking[]>): HttpResponse<Booking[]> {
        const jsonResponse: Booking[] = res.body;
        const body: Booking[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Booking.
     */
    private convertItemFromServer(booking: Booking): Booking {
        const copy: Booking = Object.assign({}, booking);
        copy.dateReg = this.dateUtils
            .convertLocalDateFromServer(booking.dateReg);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(booking.date);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(booking.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(booking.endDate);
        return copy;
    }

    /**
     * Convert a Booking to a JSON which can be sent to the server.
     */
    private convert(booking: Booking): Booking {
        const copy: Booking = Object.assign({}, booking);
        copy.dateReg = this.dateUtils
            .convertLocalDateToServer(booking.dateReg);
        copy.date = this.dateUtils
            .convertLocalDateToServer(booking.date);

        copy.startDate = this.dateUtils.toDate(this.datePipe.transform(booking.startDate, FORMAT_DATE_TIME));

        copy.endDate = this.dateUtils.toDate(this.datePipe.transform(booking.endDate, FORMAT_DATE_TIME));
        return copy;
    }
}
