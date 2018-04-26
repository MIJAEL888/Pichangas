import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from '../../shared';
import {
    DistrictService,
    DistrictPopupService,
    DistrictComponent,
    DistrictDetailComponent,
    DistrictDialogComponent,
    DistrictPopupComponent,
    DistrictDeletePopupComponent,
    DistrictDeleteDialogComponent,
    districtRoute,
    districtPopupRoute,
} from './';

const ENTITY_STATES = [
    ...districtRoute,
    ...districtPopupRoute,
];

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DistrictComponent,
        DistrictDetailComponent,
        DistrictDialogComponent,
        DistrictDeleteDialogComponent,
        DistrictPopupComponent,
        DistrictDeletePopupComponent,
    ],
    entryComponents: [
        DistrictComponent,
        DistrictDialogComponent,
        DistrictPopupComponent,
        DistrictDeleteDialogComponent,
        DistrictDeletePopupComponent,
    ],
    providers: [
        DistrictService,
        DistrictPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasDistrictModule {}
