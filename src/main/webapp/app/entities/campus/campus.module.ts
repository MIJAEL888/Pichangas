import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from 'app/shared';
import {
    CampusComponent,
    CampusDetailComponent,
    CampusUpdateComponent,
    CampusDeletePopupComponent,
    CampusDeleteDialogComponent,
    campusRoute,
    campusPopupRoute
} from './';

const ENTITY_STATES = [...campusRoute, ...campusPopupRoute];

@NgModule({
    imports: [PichangasSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CampusComponent, CampusDetailComponent, CampusUpdateComponent, CampusDeleteDialogComponent, CampusDeletePopupComponent],
    entryComponents: [CampusComponent, CampusUpdateComponent, CampusDeleteDialogComponent, CampusDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasCampusModule {}
