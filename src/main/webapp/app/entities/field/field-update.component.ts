import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IField } from 'app/shared/model/field.model';
import { FieldService } from './field.service';
import { ICampus } from 'app/shared/model/campus.model';
import { CampusService } from 'app/entities/campus';

@Component({
    selector: 'jhi-field-update',
    templateUrl: './field-update.component.html'
})
export class FieldUpdateComponent implements OnInit {
    private _field: IField;
    isSaving: boolean;

    campuses: ICampus[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private fieldService: FieldService,
        private campusService: CampusService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ field }) => {
            this.field = field;
        });
        this.campusService.query().subscribe(
            (res: HttpResponse<ICampus[]>) => {
                this.campuses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.field.id !== undefined) {
            this.subscribeToSaveResponse(this.fieldService.update(this.field));
        } else {
            this.subscribeToSaveResponse(this.fieldService.create(this.field));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IField>>) {
        result.subscribe((res: HttpResponse<IField>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCampusById(index: number, item: ICampus) {
        return item.id;
    }
    get field() {
        return this._field;
    }

    set field(field: IField) {
        this._field = field;
    }
}
