import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IBooking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { IField } from 'app/shared/model/field.model';
import { FieldService } from 'app/entities/field';
import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from 'app/entities/schedule';
import { IClientFinal } from 'app/shared/model/client-final.model';
import { ClientFinalService } from 'app/entities/client-final';

@Component({
    selector: 'jhi-booking-update',
    templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
    private _booking: IBooking;
    isSaving: boolean;

    fields: IField[];

    schedules: ISchedule[];

    clientfinals: IClientFinal[];
    dateRegDp: any;
    dateDp: any;
    startDate: string;
    endDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private fieldService: FieldService,
        private scheduleService: ScheduleService,
        private clientFinalService: ClientFinalService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = booking;
        });
        this.fieldService.query().subscribe(
            (res: HttpResponse<IField[]>) => {
                this.fields = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.scheduleService.query().subscribe(
            (res: HttpResponse<ISchedule[]>) => {
                this.schedules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clientFinalService.query().subscribe(
            (res: HttpResponse<IClientFinal[]>) => {
                this.clientfinals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.booking.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.booking.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.booking.id !== undefined) {
            this.subscribeToSaveResponse(this.bookingService.update(this.booking));
        } else {
            this.subscribeToSaveResponse(this.bookingService.create(this.booking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>) {
        result.subscribe((res: HttpResponse<IBooking>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFieldById(index: number, item: IField) {
        return item.id;
    }

    trackScheduleById(index: number, item: ISchedule) {
        return item.id;
    }

    trackClientFinalById(index: number, item: IClientFinal) {
        return item.id;
    }
    get booking() {
        return this._booking;
    }

    set booking(booking: IBooking) {
        this._booking = booking;
        this.startDate = moment(booking.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(booking.endDate).format(DATE_TIME_FORMAT);
    }
}
