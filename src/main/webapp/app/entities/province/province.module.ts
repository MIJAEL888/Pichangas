import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from '../../shared';
import {
    ProvinceService,
    ProvincePopupService,
    ProvinceComponent,
    ProvinceDetailComponent,
    ProvinceDialogComponent,
    ProvincePopupComponent,
    ProvinceDeletePopupComponent,
    ProvinceDeleteDialogComponent,
    provinceRoute,
    provincePopupRoute,
} from './';

const ENTITY_STATES = [
    ...provinceRoute,
    ...provincePopupRoute,
];

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProvinceComponent,
        ProvinceDetailComponent,
        ProvinceDialogComponent,
        ProvinceDeleteDialogComponent,
        ProvincePopupComponent,
        ProvinceDeletePopupComponent,
    ],
    entryComponents: [
        ProvinceComponent,
        ProvinceDialogComponent,
        ProvincePopupComponent,
        ProvinceDeleteDialogComponent,
        ProvinceDeletePopupComponent,
    ],
    providers: [
        ProvinceService,
        ProvincePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasProvinceModule {}
