import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISchedule } from 'app/shared/model/schedule.model';
import { ScheduleService } from './schedule.service';
import { IField } from 'app/shared/model/field.model';
import { FieldService } from 'app/entities/field';

@Component({
    selector: 'jhi-schedule-update',
    templateUrl: './schedule-update.component.html'
})
export class ScheduleUpdateComponent implements OnInit {
    private _schedule: ISchedule;
    isSaving: boolean;

    fields: IField[];
    startDate: string;
    endDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private scheduleService: ScheduleService,
        private fieldService: FieldService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
        });
        this.fieldService.query().subscribe(
            (res: HttpResponse<IField[]>) => {
                this.fields = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.schedule.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.schedule.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(this.scheduleService.create(this.schedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISchedule>>) {
        result.subscribe((res: HttpResponse<ISchedule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get schedule() {
        return this._schedule;
    }

    set schedule(schedule: ISchedule) {
        this._schedule = schedule;
        this.startDate = moment(schedule.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(schedule.endDate).format(DATE_TIME_FORMAT);
    }
}
