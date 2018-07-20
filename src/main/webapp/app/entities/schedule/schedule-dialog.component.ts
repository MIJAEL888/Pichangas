import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Schedule } from './schedule.model';
import { SchedulePopupService } from './schedule-popup.service';
import { ScheduleService } from './schedule.service';
import { Field, FieldService } from '../field';

@Component({
    selector: 'jhi-schedule-dialog',
    templateUrl: './schedule-dialog.component.html'
})
export class ScheduleDialogComponent implements OnInit {

    schedule: Schedule;
    isSaving: boolean;

    fields: Field[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private scheduleService: ScheduleService,
        private fieldService: FieldService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.fieldService.query()
            .subscribe((res: HttpResponse<Field[]>) => { this.fields = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(
                this.scheduleService.create(this.schedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Schedule>>) {
        result.subscribe((res: HttpResponse<Schedule>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Schedule) {
        this.eventManager.broadcast({ name: 'scheduleListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-schedule-popup',
    template: ''
})
export class SchedulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schedulePopupService: SchedulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schedulePopupService
                    .open(ScheduleDialogComponent as Component, params['id']);
            } else {
                this.schedulePopupService
                    .open(ScheduleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
