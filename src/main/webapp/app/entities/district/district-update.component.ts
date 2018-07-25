import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDistrict } from 'app/shared/model/district.model';
import { DistrictService } from './district.service';
import { IProvince } from 'app/shared/model/province.model';
import { ProvinceService } from 'app/entities/province';

@Component({
    selector: 'jhi-district-update',
    templateUrl: './district-update.component.html'
})
export class DistrictUpdateComponent implements OnInit {
    private _district: IDistrict;
    isSaving: boolean;

    provinces: IProvince[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private districtService: DistrictService,
        private provinceService: ProvinceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ district }) => {
            this.district = district;
        });
        this.provinceService.query().subscribe(
            (res: HttpResponse<IProvince[]>) => {
                this.provinces = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.district.id !== undefined) {
            this.subscribeToSaveResponse(this.districtService.update(this.district));
        } else {
            this.subscribeToSaveResponse(this.districtService.create(this.district));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDistrict>>) {
        result.subscribe((res: HttpResponse<IDistrict>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProvinceById(index: number, item: IProvince) {
        return item.id;
    }
    get district() {
        return this._district;
    }

    set district(district: IDistrict) {
        this._district = district;
    }
}
