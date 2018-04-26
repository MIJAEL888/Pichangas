import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientFinal } from './client-final.model';
import { ClientFinalPopupService } from './client-final-popup.service';
import { ClientFinalService } from './client-final.service';
import { UserApp, UserAppService } from '../user-app';

@Component({
    selector: 'jhi-client-final-dialog',
    templateUrl: './client-final-dialog.component.html'
})
export class ClientFinalDialogComponent implements OnInit {

    clientFinal: ClientFinal;
    isSaving: boolean;

    userapps: UserApp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clientFinalService: ClientFinalService,
        private userAppService: UserAppService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userAppService
            .query({filter: 'clientfinal-is-null'})
            .subscribe((res: HttpResponse<UserApp[]>) => {
                if (!this.clientFinal.userAppId) {
                    this.userapps = res.body;
                } else {
                    this.userAppService
                        .find(this.clientFinal.userAppId)
                        .subscribe((subRes: HttpResponse<UserApp>) => {
                            this.userapps = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clientFinal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientFinalService.update(this.clientFinal));
        } else {
            this.subscribeToSaveResponse(
                this.clientFinalService.create(this.clientFinal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClientFinal>>) {
        result.subscribe((res: HttpResponse<ClientFinal>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClientFinal) {
        this.eventManager.broadcast({ name: 'clientFinalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserAppById(index: number, item: UserApp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-client-final-popup',
    template: ''
})
export class ClientFinalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientFinalPopupService: ClientFinalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientFinalPopupService
                    .open(ClientFinalDialogComponent as Component, params['id']);
            } else {
                this.clientFinalPopupService
                    .open(ClientFinalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
