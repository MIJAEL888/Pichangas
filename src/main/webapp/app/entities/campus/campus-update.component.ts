import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICampus } from 'app/shared/model/campus.model';
import { CampusService } from './campus.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { IUserApp } from 'app/shared/model/user-app.model';
import { UserAppService } from 'app/entities/user-app';
import { IDistrict } from 'app/shared/model/district.model';
import { DistrictService } from 'app/entities/district';

@Component({
    selector: 'jhi-campus-update',
    templateUrl: './campus-update.component.html'
})
export class CampusUpdateComponent implements OnInit {
    private _campus: ICampus;
    isSaving: boolean;

    clients: IClient[];

    userapps: IUserApp[];

    districts: IDistrict[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private campusService: CampusService,
        private clientService: ClientService,
        private userAppService: UserAppService,
        private districtService: DistrictService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ campus }) => {
            this.campus = campus;
        });
        this.clientService.query().subscribe(
            (res: HttpResponse<IClient[]>) => {
                this.clients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userAppService.query().subscribe(
            (res: HttpResponse<IUserApp[]>) => {
                this.userapps = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.districtService.query().subscribe(
            (res: HttpResponse<IDistrict[]>) => {
                this.districts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.campus.id !== undefined) {
            this.subscribeToSaveResponse(this.campusService.update(this.campus));
        } else {
            this.subscribeToSaveResponse(this.campusService.create(this.campus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICampus>>) {
        result.subscribe((res: HttpResponse<ICampus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClientById(index: number, item: IClient) {
        return item.id;
    }

    trackUserAppById(index: number, item: IUserApp) {
        return item.id;
    }

    trackDistrictById(index: number, item: IDistrict) {
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
    get campus() {
        return this._campus;
    }

    set campus(campus: ICampus) {
        this._campus = campus;
    }
}
