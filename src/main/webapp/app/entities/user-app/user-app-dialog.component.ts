import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserApp } from './user-app.model';
import { UserAppPopupService } from './user-app-popup.service';
import { UserAppService } from './user-app.service';
import { ClientFinal, ClientFinalService } from '../client-final';
import { Campus, CampusService } from '../campus';

@Component({
    selector: 'jhi-user-app-dialog',
    templateUrl: './user-app-dialog.component.html'
})
export class UserAppDialogComponent implements OnInit {

    userApp: UserApp;
    isSaving: boolean;

    clientfinals: ClientFinal[];

    campuses: Campus[];
    dateRegDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userAppService: UserAppService,
        private clientFinalService: ClientFinalService,
        private campusService: CampusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientFinalService.query()
            .subscribe((res: HttpResponse<ClientFinal[]>) => { this.clientfinals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.campusService.query()
            .subscribe((res: HttpResponse<Campus[]>) => { this.campuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userApp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userAppService.update(this.userApp));
        } else {
            this.subscribeToSaveResponse(
                this.userAppService.create(this.userApp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserApp>>) {
        result.subscribe((res: HttpResponse<UserApp>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserApp) {
        this.eventManager.broadcast({ name: 'userAppListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientFinalById(index: number, item: ClientFinal) {
        return item.id;
    }

    trackCampusById(index: number, item: Campus) {
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
    selector: 'jhi-user-app-popup',
    template: ''
})
export class UserAppPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAppPopupService: UserAppPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userAppPopupService
                    .open(UserAppDialogComponent as Component, params['id']);
            } else {
                this.userAppPopupService
                    .open(UserAppDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
