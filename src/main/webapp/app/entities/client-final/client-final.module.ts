import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PichangasSharedModule } from 'app/shared';
import {
    ClientFinalComponent,
    ClientFinalDetailComponent,
    ClientFinalUpdateComponent,
    ClientFinalDeletePopupComponent,
    ClientFinalDeleteDialogComponent,
    clientFinalRoute,
    clientFinalPopupRoute
} from './';

const ENTITY_STATES = [...clientFinalRoute, ...clientFinalPopupRoute];

@NgModule({
    imports: [PichangasSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClientFinalComponent,
        ClientFinalDetailComponent,
        ClientFinalUpdateComponent,
        ClientFinalDeleteDialogComponent,
        ClientFinalDeletePopupComponent
    ],
    entryComponents: [ClientFinalComponent, ClientFinalUpdateComponent, ClientFinalDeleteDialogComponent, ClientFinalDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PichangasClientFinalModule {}
