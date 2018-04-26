import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from '../../shared';
import {
    CampusService,
    CampusPopupService,
    CampusComponent,
    CampusDetailComponent,
    CampusDialogComponent,
    CampusPopupComponent,
    CampusDeletePopupComponent,
    CampusDeleteDialogComponent,
    campusRoute,
    campusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...campusRoute,
    ...campusPopupRoute,
];

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CampusComponent,
        CampusDetailComponent,
        CampusDialogComponent,
        CampusDeleteDialogComponent,
        CampusPopupComponent,
        CampusDeletePopupComponent,
    ],
    entryComponents: [
        CampusComponent,
        CampusDialogComponent,
        CampusPopupComponent,
        CampusDeleteDialogComponent,
        CampusDeletePopupComponent,
    ],
    providers: [
        CampusService,
        CampusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasCampusModule {}
