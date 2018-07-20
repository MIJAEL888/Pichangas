import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserApp } from 'app/shared/model/user-app.model';
import { UserAppService } from './user-app.service';
import { IClientFinal } from 'app/shared/model/client-final.model';
import { ClientFinalService } from 'app/entities/client-final';
import { ICampus } from 'app/shared/model/campus.model';
import { CampusService } from 'app/entities/campus';

@Component({
    selector: 'jhi-user-app-update',
    templateUrl: './user-app-update.component.html'
})
export class UserAppUpdateComponent implements OnInit {
    private _userApp: IUserApp;
    isSaving: boolean;

    clientfinals: IClientFinal[];

    campuses: ICampus[];
    dateRegDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private userAppService: UserAppService,
        private clientFinalService: ClientFinalService,
        private campusService: CampusService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userApp }) => {
            this.userApp = userApp;
        });
        this.clientFinalService.query().subscribe(
            (res: HttpResponse<IClientFinal[]>) => {
                this.clientfinals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.userApp.id !== undefined) {
            this.subscribeToSaveResponse(this.userAppService.update(this.userApp));
        } else {
            this.subscribeToSaveResponse(this.userAppService.create(this.userApp));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserApp>>) {
        result.subscribe((res: HttpResponse<IUserApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClientFinalById(index: number, item: IClientFinal) {
        return item.id;
    }

    trackCampusById(index: number, item: ICampus) {
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
    get userApp() {
        return this._userApp;
    }

    set userApp(userApp: IUserApp) {
        this._userApp = userApp;
    }
}
