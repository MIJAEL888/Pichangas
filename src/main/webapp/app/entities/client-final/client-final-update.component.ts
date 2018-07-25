import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IClientFinal } from 'app/shared/model/client-final.model';
import { ClientFinalService } from './client-final.service';
import { IUserApp } from 'app/shared/model/user-app.model';
import { UserAppService } from 'app/entities/user-app';

@Component({
    selector: 'jhi-client-final-update',
    templateUrl: './client-final-update.component.html'
})
export class ClientFinalUpdateComponent implements OnInit {
    private _clientFinal: IClientFinal;
    isSaving: boolean;

    userapps: IUserApp[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private clientFinalService: ClientFinalService,
        private userAppService: UserAppService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ clientFinal }) => {
            this.clientFinal = clientFinal;
        });
        this.userAppService.query({ filter: 'clientfinal-is-null' }).subscribe(
            (res: HttpResponse<IUserApp[]>) => {
                if (!this.clientFinal.userAppId) {
                    this.userapps = res.body;
                } else {
                    this.userAppService.find(this.clientFinal.userAppId).subscribe(
                        (subRes: HttpResponse<IUserApp>) => {
                            this.userapps = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.clientFinal.id !== undefined) {
            this.subscribeToSaveResponse(this.clientFinalService.update(this.clientFinal));
        } else {
            this.subscribeToSaveResponse(this.clientFinalService.create(this.clientFinal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClientFinal>>) {
        result.subscribe((res: HttpResponse<IClientFinal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserAppById(index: number, item: IUserApp) {
        return item.id;
    }
    get clientFinal() {
        return this._clientFinal;
    }

    set clientFinal(clientFinal: IClientFinal) {
        this._clientFinal = clientFinal;
    }
}
