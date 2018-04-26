import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Field } from './field.model';
import { FieldPopupService } from './field-popup.service';
import { FieldService } from './field.service';
import { Campus, CampusService } from '../campus';

@Component({
    selector: 'jhi-field-dialog',
    templateUrl: './field-dialog.component.html'
})
export class FieldDialogComponent implements OnInit {

    field: Field;
    isSaving: boolean;

    campuses: Campus[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fieldService: FieldService,
        private campusService: CampusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.campusService.query()
            .subscribe((res: HttpResponse<Campus[]>) => { this.campuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.field.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldService.update(this.field));
        } else {
            this.subscribeToSaveResponse(
                this.fieldService.create(this.field));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Field>>) {
        result.subscribe((res: HttpResponse<Field>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Field) {
        this.eventManager.broadcast({ name: 'fieldListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCampusById(index: number, item: Campus) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-field-popup',
    template: ''
})
export class FieldPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldPopupService: FieldPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldPopupService
                    .open(FieldDialogComponent as Component, params['id']);
            } else {
                this.fieldPopupService
                    .open(FieldDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
