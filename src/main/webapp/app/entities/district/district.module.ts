import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from 'app/shared';
import {
    DistrictComponent,
    DistrictDetailComponent,
    DistrictUpdateComponent,
    DistrictDeletePopupComponent,
    DistrictDeleteDialogComponent,
    districtRoute,
    districtPopupRoute
} from './';

const ENTITY_STATES = [...districtRoute, ...districtPopupRoute];

@NgModule({
    imports: [PichangasSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DistrictComponent,
        DistrictDetailComponent,
        DistrictUpdateComponent,
        DistrictDeleteDialogComponent,
        DistrictDeletePopupComponent
    ],
    entryComponents: [DistrictComponent, DistrictUpdateComponent, DistrictDeleteDialogComponent, DistrictDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasDistrictModule {}
