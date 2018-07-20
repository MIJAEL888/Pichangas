import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from '../../shared';
import {
    UserAppService,
    UserAppPopupService,
    UserAppComponent,
    UserAppDetailComponent,
    UserAppDialogComponent,
    UserAppPopupComponent,
    UserAppDeletePopupComponent,
    UserAppDeleteDialogComponent,
    userAppRoute,
    userAppPopupRoute,
    UserAppResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userAppRoute,
    ...userAppPopupRoute,
];

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserAppComponent,
        UserAppDetailComponent,
        UserAppDialogComponent,
        UserAppDeleteDialogComponent,
        UserAppPopupComponent,
        UserAppDeletePopupComponent,
    ],
    entryComponents: [
        UserAppComponent,
        UserAppDialogComponent,
        UserAppPopupComponent,
        UserAppDeleteDialogComponent,
        UserAppDeletePopupComponent,
    ],
    providers: [
        UserAppService,
        UserAppPopupService,
        UserAppResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasUserAppModule {}
