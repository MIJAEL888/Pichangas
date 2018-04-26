import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Campus } from './campus.model';
import { CampusPopupService } from './campus-popup.service';
import { CampusService } from './campus.service';
import { Client, ClientService } from '../client';
import { UserApp, UserAppService } from '../user-app';
import { District, DistrictService } from '../district';

@Component({
    selector: 'jhi-campus-dialog',
    templateUrl: './campus-dialog.component.html'
})
export class CampusDialogComponent implements OnInit {

    campus: Campus;
    isSaving: boolean;

    clients: Client[];

    userapps: UserApp[];

    districts: District[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private campusService: CampusService,
        private clientService: ClientService,
        private userAppService: UserAppService,
        private districtService: DistrictService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userAppService.query()
            .subscribe((res: HttpResponse<UserApp[]>) => { this.userapps = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.districtService.query()
            .subscribe((res: HttpResponse<District[]>) => { this.districts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.campus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.campusService.update(this.campus));
        } else {
            this.subscribeToSaveResponse(
                this.campusService.create(this.campus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Campus>>) {
        result.subscribe((res: HttpResponse<Campus>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Campus) {
        this.eventManager.broadcast({ name: 'campusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    trackUserAppById(index: number, item: UserApp) {
        return item.id;
    }

    trackDistrictById(index: number, item: District) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-campus-popup',
    template: ''
})
export class CampusPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private campusPopupService: CampusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.campusPopupService
                    .open(CampusDialogComponent as Component, params['id']);
            } else {
                this.campusPopupService
                    .open(CampusDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
