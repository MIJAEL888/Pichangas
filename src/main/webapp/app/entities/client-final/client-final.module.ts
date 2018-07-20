import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from '../../shared';
import {
    ClientFinalService,
    ClientFinalPopupService,
    ClientFinalComponent,
    ClientFinalDetailComponent,
    ClientFinalDialogComponent,
    ClientFinalPopupComponent,
    ClientFinalDeletePopupComponent,
    ClientFinalDeleteDialogComponent,
    clientFinalRoute,
    clientFinalPopupRoute,
    ClientFinalResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...clientFinalRoute,
    ...clientFinalPopupRoute,
];

@NgModule({
    imports: [
        PichangasSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClientFinalComponent,
        ClientFinalDetailComponent,
        ClientFinalDialogComponent,
        ClientFinalDeleteDialogComponent,
        ClientFinalPopupComponent,
        ClientFinalDeletePopupComponent,
    ],
    entryComponents: [
        ClientFinalComponent,
        ClientFinalDialogComponent,
        ClientFinalPopupComponent,
        ClientFinalDeleteDialogComponent,
        ClientFinalDeletePopupComponent,
    ],
    providers: [
        ClientFinalService,
        ClientFinalPopupService,
        ClientFinalResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasClientFinalModule {}
