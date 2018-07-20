import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Booking } from './booking.model';
import { BookingPopupService } from './booking-popup.service';
import { BookingService } from './booking.service';
import { Field, FieldService } from '../field';
import { Schedule, ScheduleService } from '../schedule';
import { ClientFinal, ClientFinalService } from '../client-final';

@Component({
    selector: 'jhi-booking-dialog',
    templateUrl: './booking-dialog.component.html'
})
export class BookingDialogComponent implements OnInit {

    booking: Booking;
    isSaving: boolean;

    fields: Field[];

    schedules: Schedule[];

    clientfinals: ClientFinal[];
    dateRegDp: any;
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private fieldService: FieldService,
        private scheduleService: ScheduleService,
        private clientFinalService: ClientFinalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fieldService.query()
            .subscribe((res: HttpResponse<Field[]>) => { this.fields = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.scheduleService.query()
            .subscribe((res: HttpResponse<Schedule[]>) => { this.schedules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clientFinalService.query()
            .subscribe((res: HttpResponse<ClientFinal[]>) => { this.clientfinals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.booking.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bookingService.update(this.booking));
        } else {
            this.subscribeToSaveResponse(
                this.bookingService.create(this.booking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Booking>>) {
        result.subscribe(
            (res: HttpResponse<Booking>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Booking) {
        this.eventManager.broadcast({ name: 'bookingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFieldById(index: number, item: Field) {
        return item.id;
    }

    trackScheduleById(index: number, item: Schedule) {
        return item.id;
    }

    trackClientFinalById(index: number, item: ClientFinal) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-booking-popup',
    template: ''
})
export class BookingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bookingPopupService: BookingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bookingPopupService
                    .open(BookingDialogComponent as Component, params['id']);
            } else {
                this.bookingPopupService
                    .open(BookingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
