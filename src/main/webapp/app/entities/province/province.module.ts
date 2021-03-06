import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from 'app/shared';
import {
    ProvinceComponent,
    ProvinceDetailComponent,
    ProvinceUpdateComponent,
    ProvinceDeletePopupComponent,
    ProvinceDeleteDialogComponent,
    provinceRoute,
    provincePopupRoute
} from './';

const ENTITY_STATES = [...provinceRoute, ...provincePopupRoute];

@NgModule({
    imports: [PichangasSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProvinceComponent,
        ProvinceDetailComponent,
        ProvinceUpdateComponent,
        ProvinceDeleteDialogComponent,
        ProvinceDeletePopupComponent
    ],
    entryComponents: [ProvinceComponent, ProvinceUpdateComponent, ProvinceDeleteDialogComponent, ProvinceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasProvinceModule {}
