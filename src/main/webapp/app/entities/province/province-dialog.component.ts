import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Province } from './province.model';
import { ProvincePopupService } from './province-popup.service';
import { ProvinceService } from './province.service';
import { Department, DepartmentService } from '../department';

@Component({
    selector: 'jhi-province-dialog',
    templateUrl: './province-dialog.component.html'
})
export class ProvinceDialogComponent implements OnInit {

    province: Province;
    isSaving: boolean;

    departments: Department[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private provinceService: ProvinceService,
        private departmentService: DepartmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.departmentService.query()
            .subscribe((res: HttpResponse<Department[]>) => { this.departments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.province.id !== undefined) {
            this.subscribeToSaveResponse(
                this.provinceService.update(this.province));
        } else {
            this.subscribeToSaveResponse(
                this.provinceService.create(this.province));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Province>>) {
        result.subscribe((res: HttpResponse<Province>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Province) {
        this.eventManager.broadcast({ name: 'provinceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-province-popup',
    template: ''
})
export class ProvincePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private provincePopupService: ProvincePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.provincePopupService
                    .open(ProvinceDialogComponent as Component, params['id']);
            } else {
                this.provincePopupService
                    .open(ProvinceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
