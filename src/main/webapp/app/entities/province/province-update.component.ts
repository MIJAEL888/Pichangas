import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProvince } from 'app/shared/model/province.model';
import { ProvinceService } from './province.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';

@Component({
    selector: 'jhi-province-update',
    templateUrl: './province-update.component.html'
})
export class ProvinceUpdateComponent implements OnInit {
    private _province: IProvince;
    isSaving: boolean;

    departments: IDepartment[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private provinceService: ProvinceService,
        private departmentService: DepartmentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ province }) => {
            this.province = province;
        });
        this.departmentService.query().subscribe(
            (res: HttpResponse<IDepartment[]>) => {
                this.departments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.province.id !== undefined) {
            this.subscribeToSaveResponse(this.provinceService.update(this.province));
        } else {
            this.subscribeToSaveResponse(this.provinceService.create(this.province));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProvince>>) {
        result.subscribe((res: HttpResponse<IProvince>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartmentById(index: number, item: IDepartment) {
        return item.id;
    }
    get province() {
        return this._province;
    }

    set province(province: IProvince) {
        this._province = province;
    }
}
