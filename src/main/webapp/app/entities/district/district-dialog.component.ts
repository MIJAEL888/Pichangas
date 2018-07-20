import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { District } from './district.model';
import { DistrictPopupService } from './district-popup.service';
import { DistrictService } from './district.service';
import { Province, ProvinceService } from '../province';

@Component({
    selector: 'jhi-district-dialog',
    templateUrl: './district-dialog.component.html'
})
export class DistrictDialogComponent implements OnInit {

    district: District;
    isSaving: boolean;

    provinces: Province[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private districtService: DistrictService,
        private provinceService: ProvinceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.provinceService.query()
            .subscribe((res: HttpResponse<Province[]>) => { this.provinces = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.district.id !== undefined) {
            this.subscribeToSaveResponse(
                this.districtService.update(this.district));
        } else {
            this.subscribeToSaveResponse(
                this.districtService.create(this.district));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<District>>) {
        result.subscribe((res: HttpResponse<District>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: District) {
        this.eventManager.broadcast({ name: 'districtListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProvinceById(index: number, item: Province) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-district-popup',
    template: ''
})
export class DistrictPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private districtPopupService: DistrictPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.districtPopupService
                    .open(DistrictDialogComponent as Component, params['id']);
            } else {
                this.districtPopupService
                    .open(DistrictDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
